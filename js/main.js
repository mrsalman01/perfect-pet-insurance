// ---- Trustpilot slider ----
(function () {
  const track = document.getElementById('tpTrack');
  const prevBtn = document.getElementById('tpPrev');
  const nextBtn = document.getElementById('tpNext');
  const dotsWrap = document.getElementById('tpDots');
  if (!track) return;

  const cards = track.children;
  let cardsPerView = 4;
  let index = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  }

  function maxIndex() {
    return Math.max(0, cards.length - cardsPerView);
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    const dotCount = maxIndex() + 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === index ? ' is-active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function update() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 16; // matches $space-sm gap in the track
    track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === maxIndex();
    renderDots();
  }

  function goTo(i) {
    index = Math.min(Math.max(i, 0), maxIndex());
    update();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    index = Math.min(index, maxIndex());
    update();
  });

  cardsPerView = getCardsPerView();
  update();
})();

// ---- Perks slider (arrows + dots) ----
(function () {
  const track = document.getElementById('perksTrack');
  const prevBtn = document.getElementById('perksPrev');
  const nextBtn = document.getElementById('perksNext');
  const dotsWrap = document.getElementById('perksDots');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.children;
  let cardsPerView = 3;
  let index = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, cards.length - cardsPerView);
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    const dotCount = maxIndex() + 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === index ? ' is-active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function update() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === maxIndex();
    renderDots();
  }

  function goTo(i) {
    index = Math.min(Math.max(i, 0), maxIndex());
    update();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    index = Math.min(index, maxIndex());
    update();
  });

  cardsPerView = getCardsPerView();
  update();
})();

// ---- Perks tabs — swap active visual state ----
document.querySelectorAll('.perks__tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.perks__tab').forEach(function (t) { t.classList.remove('perks__tab--active'); });
    tab.classList.add('perks__tab--active');
  });
});

// ---- FAQ accordion 
(function () {
  const faqList = document.querySelector('.faq__list');
  if (!faqList) return;

  faqList.addEventListener('click', function (e) {
    const btn = e.target.closest('.faq-item__question');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    item.classList.toggle('is-open');
  });
})();

// ---- Mobile nav toggle ----
(function () {
  const menuToggle = document.querySelector('.header__menu-toggle');
  const nav = document.querySelector('.header__nav');
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();  
    nav.classList.toggle('is-open');
    const isOpen = nav.classList.contains('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('is-open')) return;
    if (!nav.contains(e.target)) {
      nav.classList.remove('is-open');
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
})();
