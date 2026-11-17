// App data
const apps = {
  toki: {
    name: 'Toki',
    tagline: 'Talk & link the world',
    icon: 'TOKI.png',
    alt: 'Toki App Icon',
  },
  sugo: {
    name: 'SUGO',
    tagline: 'Online Chat Party',
    icon: 'SUGO.png',
    alt: 'SUGO App Icon',
  }
};

// ===========================
// CARD CLICK → navigate to User ID page
// ===========================
function goToUserIdPage(appKey) {
  const card = document.getElementById(`card-${appKey}`);
  card.style.transform = 'scale(0.97)';
  card.style.opacity = '0.82';

  setTimeout(() => {
    window.location.href = `userid.html?app=${appKey}`;
  }, 110);
}

document.getElementById('card-toki').addEventListener('click', () => goToUserIdPage('toki'));
document.getElementById('card-sugo').addEventListener('click', () => goToUserIdPage('sugo'));

// Keyboard: Enter / Space on cards
document.querySelectorAll('.app-card').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// ===========================
// SMOOTH rAF PARALLAX (desktop pointer only)
// ===========================
if (window.matchMedia('(pointer: fine)').matches) {
  const sparkles = Array.from(document.querySelectorAll('.sparkle'));
  let rafId = null;
  let lastX = 0;
  let lastY = 0;

  document.addEventListener('mousemove', e => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (lastX - cx) / cx;
      const dy = (lastY - cy) / cy;

      for (let i = 0; i < sparkles.length; i++) {
        const strength = (i + 1) * 6;
        sparkles[i].style.transform = `translate3d(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px, 0)`;
      }
    });
  }, { passive: true });
}
