// ===========================
// APP CONFIG
// ===========================
const APP_CONFIG = {
  toki: {
    name: 'Toki',
    icon: 'TOKI.png',
    subtitle: 'Enter your Toki User ID to continue',
    colorA: 'hsl(330, 85%, 50%)',
    colorB: 'hsl(15,  90%, 55%)',
    colorC: 'hsl(35,  95%, 58%)',
    loadingText: 'Finding Toki User...',
    // Coin packages
    coins: [
      { amount: 1840,  oldPrice: 150,  newPrice: 80  },
      { amount: 4660,  oldPrice: 380,  newPrice: 200 },
      { amount: 9510,  oldPrice: 760,  newPrice: 290 },
      { amount: 28780, oldPrice: 2300, newPrice: 590 },
      { amount: 47920, oldPrice: 3830, newPrice: 740 },
      { amount: 99970, oldPrice: 7670, newPrice: 990 },
    ],
    // VIP levels 1–16
    vip: [
      { level:1,  price:80  }, { level:2,  price:100 },
      { level:3,  price:150 }, { level:4,  price:190 },
      { level:5,  price:240 }, { level:6,  price:300 },
      { level:7,  price:360 }, { level:8,  price:420 },
      { level:9,  price:500 }, { level:10, price:580 },
      { level:11, price:640 }, { level:12, price:700 },
      { level:13, price:760 }, { level:14, price:820 },
      { level:15, price:880 }, { level:16, price:930 },
    ],
    // SVIP levels 1–7
    svip: [
      { level:1, price:180 },
      { level:2, price:250 },
      { level:3, price:320 },
      { level:4, price:400 },
      { level:5, price:490 },
      { level:6, price:580 },
      { level:7, price:690 },
    ],
  },
  sugo: {
    name: 'SUGO',
    icon: 'SUGO.png',
    subtitle: 'Enter your SUGO User ID to continue',
    colorA: 'hsl(265, 75%, 52%)',
    colorB: 'hsl(300, 70%, 58%)',
    colorC: 'hsl(330, 80%, 62%)',
    loadingText: 'Finding SUGO User...',
    btnGradient: 'linear-gradient(135deg, hsl(220,85%,62%), hsl(300,80%,60%))',
    btnShadow: 'rgba(150,60,220,0.4)',
    // Coin packages
    coins: [
      { amount: 1200,  oldPrice: 119,  newPrice: 80  },
      { amount: 2400,  oldPrice: 239,  newPrice: 120 },
      { amount: 6250,  oldPrice: 589,  newPrice: 190 },
      { amount: 12500, oldPrice: 1169, newPrice: 330 },
      { amount: 25000, oldPrice: 2199, newPrice: 490 },
      { amount: 47920, oldPrice: 3830, newPrice: 740 },
      { amount: 99970, oldPrice: 7670, newPrice: 990 },
    ],
    // VIP levels 1–16
    vip: [
      { level:1,  price:80  }, { level:2,  price:100 },
      { level:3,  price:150 }, { level:4,  price:190 },
      { level:5,  price:240 }, { level:6,  price:300 },
      { level:7,  price:360 }, { level:8,  price:420 },
      { level:9,  price:500 }, { level:10, price:580 },
      { level:11, price:640 }, { level:12, price:700 },
      { level:13, price:760 }, { level:14, price:820 },
      { level:15, price:880 }, { level:16, price:930 },
    ],
    // SVIP levels 1–7
    svip: [
      { level:1, price:180 },
      { level:2, price:250 },
      { level:3, price:320 },
      { level:4, price:400 },
      { level:5, price:490 },
      { level:6, price:580 },
      { level:7, price:690 },
    ],
  }
};


// ===========================
// READ URL PARAM
// ===========================
const params  = new URLSearchParams(window.location.search);
const appKey  = (params.get('app') || 'toki').toLowerCase();
const config  = APP_CONFIG[appKey] || APP_CONFIG.toki;

// ===========================
// APPLY THEME
// ===========================
const root = document.documentElement;
root.style.setProperty('--app-color-a', config.colorA);
root.style.setProperty('--app-color-b', config.colorB);
root.style.setProperty('--app-color-c', config.colorC);

// ===========================
// POPULATE CONTENT
// ===========================
document.title = `Enter ${config.name} User ID`;

document.getElementById('appBadgeIcon').src  = config.icon;
document.getElementById('appBadgeIcon').alt  = config.name;
document.getElementById('appBadgeName').textContent = config.name;
document.getElementById('pageSubtitle').textContent  = config.subtitle;
document.getElementById('userIdInput').placeholder   = `Enter your ${config.name} User ID`;
document.getElementById('loadingAppIcon').src  = config.icon;
document.getElementById('loadingAppIcon').alt  = config.name;
document.getElementById('loadingAppName').textContent = config.name;
document.getElementById('resultAppIcon').src   = config.icon;
document.getElementById('resultAppIcon').alt   = config.name;

// Input icon color update
document.querySelector('.input-icon').style.color = config.colorA;
document.querySelector('.paste-btn').style.setProperty('--hover-color', config.colorA);

// ===========================
// DOM REFS
// ===========================
const backBtn       = document.getElementById('backBtn');
const userIdInput   = document.getElementById('userIdInput');
const pasteBtn      = document.getElementById('pasteBtn');
const continueBtn   = document.getElementById('continueBtn');
const btnText       = document.getElementById('btnText');
const btnLoader     = document.getElementById('btnLoader');
const inputHint     = document.getElementById('inputHint');

const loadingOverlay = document.getElementById('loadingOverlay');
const loadingBar     = document.getElementById('loadingBar');
const step1          = document.getElementById('step1');
const step2          = document.getElementById('step2');
const step3          = document.getElementById('step3');

const resultOverlay  = document.getElementById('resultOverlay');
const resultTitle    = document.getElementById('resultTitle');
const resultText     = document.getElementById('resultText');
const resultUserId   = document.getElementById('resultUserId');
const resultHomeBtn  = document.getElementById('resultHomeBtn');

// ===========================
// BACK BUTTON
// ===========================
backBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// ===========================
// PASTE BUTTON
// ===========================
pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    userIdInput.value = text.trim();
    userIdInput.focus();
    inputHint.textContent = 'Pasted from clipboard ✓';
    inputHint.classList.remove('error');
    setTimeout(() => { inputHint.textContent = ''; }, 2000);
  } catch {
    inputHint.textContent = 'Allow clipboard access to paste';
    inputHint.classList.add('error');
    setTimeout(() => { inputHint.textContent = ''; inputHint.classList.remove('error'); }, 2500);
  }
});

// ===========================
// REALTIME INPUT HINT
// ===========================
userIdInput.addEventListener('input', () => {
  // Only allow digits
  userIdInput.value = userIdInput.value.replace(/\D/g, '');
  inputHint.textContent = '';
  inputHint.classList.remove('error');
  inputHint.style.color = '';
});

// ===========================
// CONTINUE BUTTON — MAIN FLOW
// ===========================
continueBtn.addEventListener('click', async () => {
  const id = userIdInput.value.trim();

  // Validate — 8 to 10 digits only
  if (!id || !/^\d{8,10}$/.test(id)) {
    inputHint.textContent = 'Please enter a valid User ID';
    inputHint.classList.add('error');
    inputHint.style.color = '';
    shake(document.getElementById('inputWrap'));
    return;
  }

  inputHint.textContent = '';
  inputHint.classList.remove('error');

  // Disable button, show loading text
  continueBtn.disabled = true;
  btnText.textContent = 'Please wait...';
  btnLoader.classList.add('active');

  // Small delay before showing overlay for UX feel
  await delay(300);

  // Show loading overlay
  showLoading(id);
});

// ===========================
// LOADING SEQUENCE (3 seconds)
// ===========================
async function showLoading(userId) {
  loadingOverlay.setAttribute('aria-hidden', 'false');

  // Reset steps
  [step1, step2, step3].forEach(s => {
    s.classList.remove('active', 'done');
    s.querySelector('.step-dot').style.background = '';
    s.querySelector('.step-dot').style.boxShadow = '';
  });
  loadingBar.style.transform = 'scaleX(0)';

  // Step 1 — 0ms → 1000ms
  step1.classList.add('active');
  animateBar(0, 33, 900);
  await delay(1000);
  step1.classList.remove('active');
  step1.classList.add('done');
  step1.querySelector('span').textContent = 'Connected ✓';

  // Step 2 — 1000ms → 2000ms
  step2.classList.add('active');
  animateBar(33, 66, 900);
  await delay(1000);
  step2.classList.remove('active');
  step2.classList.add('done');
  step2.querySelector('span').textContent = 'User found ✓';

  // Step 3 — 2000ms → 3000ms
  step3.classList.add('active');
  animateBar(66, 100, 900);
  await delay(1000);
  step3.classList.remove('active');
  step3.classList.add('done');
  step3.querySelector('span').textContent = 'Identity verified ✓';

  await delay(120);

  // Hide loading overlay
  loadingOverlay.setAttribute('aria-hidden', 'true');

  // Reset continue button
  continueBtn.disabled = false;
  btnText.textContent = 'Continue';
  btnLoader.classList.remove('active');

  await delay(180);

  // Show result
  showResult(userId);
}

// ===========================
// RESULT SCREEN
// ===========================
function showResult(userId) {
  // Populate header
  document.getElementById('resultAppIcon').src = config.icon;
  document.getElementById('resultAppIcon').alt = config.name;
  document.getElementById('resultAppName').textContent = config.name;
  document.getElementById('resultUserId').textContent  = userId;

  // Build coin packages list
  const list = document.getElementById('coinPackagesList');
  const card = document.getElementById('coinPackagesCard');
  const fallback = document.getElementById('resultText');

  list.innerHTML = '';

  if (config.coins && config.coins.length) {
    card.style.display = 'block';
    fallback.style.display = 'none';

    config.coins.forEach((pkg, i) => {
      const btnGrad   = config.btnGradient || 'linear-gradient(135deg, hsl(350,85%,58%), hsl(25,90%,58%))';
      const btnShadow = config.btnShadow   || 'rgba(220,80,60,0.35)';
      const row = document.createElement('div');
      row.className = 'coin-row';
      row.style.animationDelay = `${i * 0.07}s`;
      row.innerHTML = `
        <img src="coin.png" alt="coin" class="coin-img" decoding="async" />
        <div class="coin-amount">
          <span class="coin-num">${pkg.amount.toLocaleString()}</span>
          <span class="coin-label">Coins</span>
        </div>
        <span class="coin-old-price">&#8377;${pkg.oldPrice}</span>
        <button class="coin-buy-btn"
          style="background:${btnGrad}; box-shadow: 0 4px 14px ${btnShadow};"
          onclick="handleBuy('${config.name}', ${pkg.amount}, ${pkg.newPrice})">
          &#8377;${pkg.newPrice}
        </button>
      `;
      list.appendChild(row);
    });
  } else {
    card.style.display = 'none';
    fallback.style.display = 'block';
    fallback.textContent = `You are now a verified ${config.name} user!`;
  }

  // Build VIP / SVIP accordions
  buildVipSvip();

  resultOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Pre-warm coin package QR codes in idle background for instant modal open
  if (config.coins && config.coins.length) {
    const prefetchQrs = () => {
      config.coins.forEach(pkg => {
        const label = `${pkg.amount.toLocaleString()} ${config.name} Coins`;
        generateBrandedQrDataUrl(label, pkg.newPrice).catch(() => {});
      });
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(prefetchQrs, { timeout: 1000 });
    } else {
      setTimeout(prefetchQrs, 250);
    }
  }
}

function handleBuy(appName, coins, price) {
  openPayment(`${coins.toLocaleString()} ${appName} Coins`, price);
}

// ===========================
// BUILD VIP / SVIP GRIDS
// ===========================
function buildVipSvip() {
  const btnGrad   = config.btnGradient || 'linear-gradient(135deg, hsl(350,85%,58%), hsl(25,90%,58%))';
  const btnShadow = config.btnShadow   || 'rgba(220,80,60,0.35)';

  // --- VIP grid ---
  const vipGrid = document.getElementById('vipGrid');
  vipGrid.innerHTML = '';
  if (config.vip) {
    config.vip.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vip-card';
      card.innerHTML = `
        <span class="vip-card-crown">👑</span>
        <span class="vip-card-level">VIP ${item.level}</span>
        <span class="vip-card-price"
          style="background:${btnGrad}; box-shadow:0 3px 10px ${btnShadow};"
          onclick="handleVip('VIP', ${item.level}, ${item.price})">
          ₹${item.price.toLocaleString()}
        </span>
      `;
      vipGrid.appendChild(card);
    });
  }

  // --- SVIP grid ---
  const svipGrid = document.getElementById('svipGrid');
  svipGrid.innerHTML = '';
  if (config.svip) {
    config.svip.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vip-card svip-card';
      card.innerHTML = `
        <span class="vip-card-crown">💎</span>
        <span class="vip-card-level">SVIP ${item.level}</span>
        <span class="vip-card-price svip-price"
          onclick="handleVip('SVIP', ${item.level}, ${item.price})">
          ₹${item.price.toLocaleString()}
        </span>
      `;
      svipGrid.appendChild(card);
    });
  }
}

// ===========================
// ACCORDION TOGGLE
// ===========================
const accState = { vip: false, svip: false };

function toggleAccordion(type) {
  accState[type] = !accState[type];
  const body  = document.getElementById(`${type}Body`);
  const arrow = document.getElementById(`${type}Arrow`);
  const grid  = document.getElementById(`${type}Grid`);

  if (accState[type]) {
    // Open
    body.style.maxHeight = grid.scrollHeight + 32 + 'px';
    body.style.opacity   = '1';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    // Close
    body.style.maxHeight = '0';
    body.style.opacity   = '0';
    arrow.style.transform = 'rotate(0deg)';
  }
}

function handleVip(type, level, price) {
  openPayment(`${type} ${level}`, price);
}

// ===========================
// PAYMENT MODAL
// ===========================
const WA_NUMBER   = '918458839843';
const QR_DURATION = 5 * 60;
const VALID_COUPONS = {
  'SANSKRUTI': 20   // 20% discount
};

let payTimerInterval = null;
let paySecondsLeft   = QR_DURATION;
let payRawAmount     = 0;   // original price before discount
let payFinalAmount   = 0;   // price after any discount

function openPayment(itemLabel, amount) {
  payRawAmount   = amount;
  payFinalAmount = amount;

  // Populate order info
  document.getElementById('payOrderInfo').textContent  = itemLabel;

  // Reset amount display (no discount yet)
  document.getElementById('payAmountValue').textContent  = '\u20B9' + amount.toLocaleString();
  document.getElementById('payOriginalPrice').style.display = 'none';
  document.getElementById('payOriginalPrice').textContent   = '';

  // Reset coupon
  document.getElementById('payCouponInput').value   = '';
  document.getElementById('payCouponInput').disabled = false;
  document.getElementById('payCouponBtn').textContent = 'Apply';
  document.getElementById('payCouponBtn').disabled    = false;
  document.getElementById('payCouponBtn').style.background = '';
  const msg = document.getElementById('payCouponMsg');
  msg.textContent = ''; msg.className = 'pay-coupon-msg';

  // Reset transaction input
  document.getElementById('payTxnInput').value = '';

  // Reset expired overlay
  document.getElementById('payExpiredOverlay').style.display = 'none';
  document.getElementById('payQrImg').style.opacity = '1';
  document.getElementById('payExpireBadge').style.background = 'rgba(40,200,100,0.9)';
  document.getElementById('payExpireBadge').innerHTML = '<span class="pay-expire-dot"></span>Live';

  // Generate amount-specific QR code
  updateQrCode(itemLabel, amount);

  // Build WhatsApp URL
  updateWaLink(itemLabel, amount);

  // Start 5-minute timer
  startPayTimer();

  // Show modal
  document.getElementById('payOverlay').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

const QR_TEMPLATE_SRC = 'assets/aistudio/IMG-20260812-WA0007_9c79827d.jpg';
const BASE_UPI_PARAMS = {
  pa: 'BHARATPE.9M0L0T1D0U532576@unitype',
  pn: 'Pragya Jain',
  cu: 'INR',
  bpsign: 'T0dkZHQ0a3JxVXQ4SkdiS0xUaE9EdENHcW42QngxVVNONUxiNUpqNnhEMD0=',
};
const qrDataUrlCache = new Map();
const qrTemplatePromise = new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = QR_TEMPLATE_SRC;
});

function buildUpiUri(label, amount) {
  const amt = Number(amount).toFixed(2);
  const note = typeof label === 'string' ? label.trim().slice(0, 50) : '';
  let uri =
    `upi://pay?pa=${BASE_UPI_PARAMS.pa}` +
    `&pn=${encodeURIComponent(BASE_UPI_PARAMS.pn)}` +
    `&am=${amt}` +
    `&cu=${BASE_UPI_PARAMS.cu}` +
    `&bpsign=${BASE_UPI_PARAMS.bpsign}`;
  if (note) {
    uri += `&tn=${encodeURIComponent(note)}`;
  }
  return uri;
}

async function generateBrandedQrDataUrl(label, amount) {
  const upiUri = buildUpiUri(label, amount);
  const cached = qrDataUrlCache.get(upiUri);
  if (cached) return cached;

  const tplImg = await qrTemplatePromise;
  if (!window.QRCode || typeof window.QRCode.create !== 'function') {
    throw new Error('QRCode library not loaded');
  }

  const qr = window.QRCode.create(upiUri, { errorCorrectionLevel: 'H' });
  const n = qr.modules.size;

  const w = 737;
  const h = 690;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // 1. Draw exact uploaded card design (rounded coral/teal border + white card)
  ctx.drawImage(tplImg, 0, 0, w, h);

  // 2. Clear inner QR area to crisp white
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(138, 113, 473, 472);

  // 3. Draw dynamic amount QR modules
  const qrX = 144;
  const qrY = 119;
  const qrSize = 460;
  ctx.fillStyle = '#000000';
  for (let row = 0; row < n; row++) {
    const y0 = Math.floor(qrY + (row / n) * qrSize);
    const y1 = Math.floor(qrY + ((row + 1) / n) * qrSize);
    for (let col = 0; col < n; col++) {
      if (qr.modules.get(row, col)) {
        const x0 = Math.floor(qrX + (col / n) * qrSize);
        const x1 = Math.floor(qrX + ((col + 1) / n) * qrSize);
        ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      }
    }
  }

  // 4. Crisp white halo + exact center BharatPe circular badge
  const cx = 374;
  const cy = 348.5;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 68, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 63, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(tplImg, 0, 0, w, h);
  ctx.restore();

  const dataUrl = canvas.toDataURL('image/png');
  qrDataUrlCache.set(upiUri, dataUrl);
  return dataUrl;
}

function updateQrCode(label, amount) {
  const qrImg = document.getElementById('payQrImg');
  const key = buildUpiUri(label, amount);
  qrImg.dataset.pendingKey = key;

  const cached = qrDataUrlCache.get(key);
  if (cached) {
    qrImg.src = cached;
    qrImg.style.opacity = '1';
    return;
  }

  qrImg.style.opacity = '0.35';
  generateBrandedQrDataUrl(label, amount)
    .then(dataUrl => {
      if (qrImg.dataset.pendingKey !== key) return;
      qrImg.src = dataUrl;
      qrImg.style.opacity = '1';
    })
    .catch(() => {
      if (qrImg.dataset.pendingKey !== key) return;
      qrImg.src = `/api/qr?amount=${encodeURIComponent(amount)}&tn=${encodeURIComponent(label)}`;
      qrImg.style.opacity = '1';
    });
}

function updateWaLink(label, finalAmt) {
  const waMsg = encodeURIComponent(
    `Hi, I have done a payment of \u20B9${finalAmt} for *${label}* on ${config.name}.\n\nPlease process my order. Sending screenshot.`
  );
  document.getElementById('payWaBtn').href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
}

// ===========================
// COUPON LOGIC
// ===========================
document.getElementById('payCouponBtn').addEventListener('click', () => {
  const code = document.getElementById('payCouponInput').value.trim().toUpperCase();
  const msg  = document.getElementById('payCouponMsg');

  if (!code) {
    msg.textContent = 'Please enter a coupon code';
    msg.className   = 'pay-coupon-msg error';
    return;
  }

  if (VALID_COUPONS[code] !== undefined) {
    const discountPct = VALID_COUPONS[code];
    const saving      = Math.round(payRawAmount * discountPct / 100);
    payFinalAmount    = payRawAmount - saving;

    // Show strikethrough original + discounted price
    document.getElementById('payOriginalPrice').textContent  = '\u20B9' + payRawAmount.toLocaleString();
    document.getElementById('payOriginalPrice').style.display = 'inline';
    document.getElementById('payAmountValue').textContent    = '\u20B9' + payFinalAmount.toLocaleString();

    // Success message
    msg.innerHTML = `\u2714\uFE0F <strong>SANSKRUTI</strong> applied! You save \u20B9${saving} (${discountPct}% off)`;
    msg.className = 'pay-coupon-msg success';

    // Lock coupon input
    document.getElementById('payCouponInput').disabled  = true;
    document.getElementById('payCouponBtn').textContent = 'Applied \u2713';
    document.getElementById('payCouponBtn').disabled    = true;
    document.getElementById('payCouponBtn').style.background = '#28a745';

    // Update QR code and WhatsApp link with new final price
    const label = document.getElementById('payOrderInfo').textContent;
    updateQrCode(label, payFinalAmount);
    updateWaLink(label, payFinalAmount);

  } else {
    msg.textContent = '\u274C Invalid coupon code. Please try again.';
    msg.className   = 'pay-coupon-msg error';
    // Shake the input
    document.getElementById('payCouponInput').style.animation = 'none';
    requestAnimationFrame(() => {
      document.getElementById('payCouponInput').style.animation = 'shake 0.4s ease';
    });
  }
});

// Also allow Enter key on coupon input
document.getElementById('payCouponInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('payCouponBtn').click();
});

function startPayTimer() {
  clearInterval(payTimerInterval);
  paySecondsLeft = QR_DURATION;
  updateTimerDisplay(paySecondsLeft);
  updateProgress(paySecondsLeft);

  payTimerInterval = setInterval(() => {
    paySecondsLeft--;
    updateTimerDisplay(paySecondsLeft);
    updateProgress(paySecondsLeft);

    if (paySecondsLeft <= 0) {
      clearInterval(payTimerInterval);
      onQrExpired();
    }
  }, 1000);
}

function updateTimerDisplay(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  const el = document.getElementById('payTimer');
  el.textContent = `${m}:${s}`;

  // Turn red in last 60 seconds
  if (secs <= 60) {
    el.style.color = '#ff4444';
    document.getElementById('payTimerWrap').style.background = 'rgba(255,68,68,0.08)';
  } else {
    el.style.color = '';
    document.getElementById('payTimerWrap').style.background = '';
  }
}

function updateProgress(secs) {
  const pct = (secs / QR_DURATION) * 100;
  document.getElementById('payProgressFill').style.width = pct + '%';

  // Color shift: green → orange → red
  let color;
  if (pct > 50)       color = 'hsl(140, 70%, 45%)';
  else if (pct > 20)  color = 'hsl(35,  90%, 52%)';
  else                color = 'hsl(0,   80%, 55%)';
  document.getElementById('payProgressFill').style.background = color;
}

function onQrExpired() {
  document.getElementById('payQrImg').style.opacity     = '0.25';
  document.getElementById('payExpireBadge').style.background = 'rgba(200,50,50,0.9)';
  document.getElementById('payExpireBadge').textContent  = 'Expired';
  document.getElementById('payExpiredOverlay').style.display = 'flex';
}

function closePayment() {
  clearInterval(payTimerInterval);
  document.getElementById('payOverlay').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close button
document.getElementById('payCloseBtn').addEventListener('click', closePayment);

// Close on backdrop click
document.getElementById('payOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('payOverlay')) closePayment();
});

// Submit transaction ID
document.getElementById('paySubmitBtn').addEventListener('click', () => {
  const txn = document.getElementById('payTxnInput').value.trim();
  if (!txn) {
    document.getElementById('payTxnInput').style.border = '2px solid #ff4444';
    document.getElementById('payTxnInput').placeholder  = 'Please enter Transaction ID!';
    setTimeout(() => {
      document.getElementById('payTxnInput').style.border = '';
      document.getElementById('payTxnInput').placeholder  = 'Enter Transaction / UTR ID';
    }, 2000);
    return;
  }
  // Build WhatsApp message with TXN ID
  const item   = document.getElementById('payOrderInfo').textContent;
  const amount = document.getElementById('payAmountValue').textContent;
  const waMsg  = encodeURIComponent(
    `Hi, Payment done for *${item}* (${amount}).\n\nTransaction ID: *${txn}*\n\nPlease process my order.`
  );
  closePayment();
  window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
});

// ===========================
// RESULT HOME BUTTON
// ===========================
resultHomeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// ===========================
// HELPERS
// ===========================
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function animateBar(from, to, duration) {
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = t < 0.5 ? 2*t*t : -1+(4-2*t)*t; // ease-in-out
    const scale = (from + (to - from) * eased) / 100;
    loadingBar.style.transform = `scaleX(${scale})`;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function shake(el) {
  el.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(8px)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(0)' },
  ], { duration: 400, easing: 'ease-in-out' });
}

// ===========================
// KEYBOARD: Enter to submit
// ===========================
userIdInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') continueBtn.click();
});
