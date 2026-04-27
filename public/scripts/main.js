// Sticky header scroll state
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Projects tabs
(function () {
  const tabs = document.querySelectorAll('.proj-tab');
  const panels = document.querySelectorAll('.proj-panel');
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === target));
    });
  });
})();

// Copy email button
(function () {
  const btn = document.querySelector('.copy-btn');
  if (!btn) return;
  const email = btn.dataset.email || 'm@mkotas.cz';
  const labelEl = btn.querySelector('.copy-label');
  const iconCopy = btn.querySelector('.icon-copy');
  const iconCheck = btn.querySelector('.icon-check');
  let timer = null;
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
    }
    btn.classList.add('copied');
    if (labelEl) labelEl.textContent = 'Copied';
    if (iconCopy) iconCopy.style.display = 'none';
    if (iconCheck) iconCheck.style.display = 'inline-block';
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      btn.classList.remove('copied');
      if (labelEl) labelEl.textContent = 'Copy';
      if (iconCopy) iconCopy.style.display = 'inline-block';
      if (iconCheck) iconCheck.style.display = 'none';
    }, 1800);
  });
})();

// Footer year
(function () {
  const el = document.getElementById('foot-year');
  if (el) el.textContent = new Date().getFullYear();
})();
