import { execSync } from 'child_process';
import express from 'express';
import path from 'path';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const publicDir = path.join(__dirname, 'public');
const qrTemplatePath = path.join(publicDir, 'assets', 'aistudio', 'IMG-20260812-WA0007_9c79827d.jpg');

const BASE_UPI_PARAMS = {
  pa: 'BHARATPE.9M0L0T1D0U532576@unitype',
  pn: 'Pragya Jain',
  cu: 'INR',
  bpsign: 'T0dkZHQ0a3JxVXQ4SkdiS0xUaE9EdENHcW42QngxVVNONUxiNUpqNnhEMD0=',
};

const TEMPLATE_WIDTH = 737;
const TEMPLATE_HEIGHT = 690;
let templateRgba = null;
try {
  templateRgba = execSync(
    `ffmpeg -v error -i "${qrTemplatePath}" -f rawvideo -pix_fmt rgba -`,
    { maxBuffer: 20 * 1024 * 1024 }
  );
} catch (err) {
  console.warn('Could not load QR template RGBA via ffmpeg, falling back to plain QR:', err.message);
}

// CRC32 table for PNG encoding
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodeRgbaToPng(rgba, width, height) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0; // filter type 0 (None)
    rgba.copy(raw, rowStart + 1, y * stride, (y + 1) * stride);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const idat = zlib.deflateSync(raw, { level: 3 });
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  return Buffer.concat([
    signature,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function renderBrandedQrPng(upiUri) {
  const qr = QRCode.create(upiUri, { errorCorrectionLevel: 'H' });
  const n = qr.modules.size;
  const buf = Buffer.from(templateRgba);

  const cx = 374;
  const cy = 348.5;
  const rBadge = 63;
  const rHalo = 68;
  const xMin = 138;
  const xMax = 610;
  const yMin = 113;
  const yMax = 584;
  const qrX = 144;
  const qrY = 119;
  const qrSize = 460;

  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const distSq = dx * dx + dy * dy;

      // Preserve exact center logo pixels
      if (distSq <= rBadge * rBadge) continue;

      const idx = (y * TEMPLATE_WIDTH + x) * 4;
      let isDark = false;

      // Clean white halo around the center logo, QR modules outside it
      if (distSq > rHalo * rHalo && x >= qrX && x < qrX + qrSize && y >= qrY && y < qrY + qrSize) {
        const col = Math.floor(((x - qrX) / qrSize) * n);
        const row = Math.floor(((y - qrY) / qrSize) * n);
        isDark = qr.modules.get(row, col) === 1;
      }

      const v = isDark ? 0 : 255;
      buf[idx] = v;
      buf[idx + 1] = v;
      buf[idx + 2] = v;
      buf[idx + 3] = 255;
    }
  }

  return encodeRgbaToPng(buf, TEMPLATE_WIDTH, TEMPLATE_HEIGHT);
}

const qrCache = new Map();
const MAX_QR_CACHE = 250;

app.get('/api/qr', async (req, res) => {
  try {
    const rawAmount = Number(req.query.amount);
    if (!Number.isFinite(rawAmount) || rawAmount <= 0 || rawAmount > 1000000) {
      return res.status(400).send('Invalid amount');
    }

    const note = typeof req.query.tn === 'string' ? req.query.tn.trim().slice(0, 50) : '';
    let upiUri =
      `upi://pay?pa=${BASE_UPI_PARAMS.pa}` +
      `&pn=${encodeURIComponent(BASE_UPI_PARAMS.pn)}` +
      `&am=${rawAmount.toFixed(2)}` +
      `&cu=${BASE_UPI_PARAMS.cu}` +
      `&bpsign=${BASE_UPI_PARAMS.bpsign}`;
    if (note) {
      upiUri += `&tn=${encodeURIComponent(note)}`;
    }

    let pngBuffer = qrCache.get(upiUri);
    if (!pngBuffer) {
      pngBuffer = templateRgba
        ? renderBrandedQrPng(upiUri)
        : await QRCode.toBuffer(upiUri, {
            type: 'png',
            width: 512,
            margin: 2,
            errorCorrectionLevel: 'H',
            color: {
              dark: '#000000',
              light: '#ffffff',
            },
          });

      if (qrCache.size >= MAX_QR_CACHE) {
        const oldestKey = qrCache.keys().next().value;
        qrCache.delete(oldestKey);
      }
      qrCache.set(upiUri, pngBuffer);
    }

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(pngBuffer);
  } catch (err) {
    console.error('QR generation failed:', err);
    res.status(500).send('Failed to generate QR code');
  }
});

app.use(express.static(publicDir, { maxAge: '1h' }));

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
