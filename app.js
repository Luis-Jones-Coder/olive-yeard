const scenes = [...document.querySelectorAll('.scene')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const viewTriggers = [...document.querySelectorAll('[data-view]')];
const curtain = document.getElementById('transitionCurtain');
const menu = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const sceneVideos = {
  home: document.getElementById('homeVideo'),
  about: document.getElementById('aboutVideo'),
  services: document.getElementById('servicesVideo'),
  contact: document.getElementById('contactVideo')
};
const contactScene = document.getElementById('contact');
const contactVideo = sceneVideos.contact;
const contactBackgroundVideo = document.getElementById('contactBackgroundVideo');
const skipIntro = document.getElementById('skipIntro');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const galleryScene = document.getElementById('gallery');
const propertyCards = [...document.querySelectorAll('.property-card[data-property]')];
const closeProperty = document.getElementById('closeProperty');
const propertyView = document.getElementById('propertyView');
const propertyMainImage = document.getElementById('propertyMainImage');
const propertyImageType = document.getElementById('propertyImageType');
const propertyTitle = document.getElementById('propertyTitle');
const propertyThumbs = [...document.querySelectorAll('.property-thumb')];
const propertyData = {
  property1: { title: 'Olive Grove Villa', base: 'property-1' },
  property2: { title: 'Palm Court Villa', base: 'property-2' },
  property3: { title: 'Horizon Residence', base: 'property-3' },
  property4: { title: 'Glass Garden Villa', base: 'property-4' }
};
let selectedProperty = propertyData.property1;
let activeView = 'home';
let transitionTimer;

function setPropertyView(open) {
  galleryScene?.classList.toggle('show-property', open);
  propertyView?.setAttribute('aria-hidden', String(!open));
}

function showPropertyImage(button) {
  if (!propertyMainImage || !button) return;
  propertyThumbs.forEach(thumb => thumb.classList.toggle('is-active', thumb === button));
  propertyMainImage.classList.add('is-changing');
  setTimeout(() => {
    propertyMainImage.onload = () => propertyMainImage.classList.remove('is-changing');
    propertyMainImage.src = button.dataset.image;
    propertyMainImage.alt = `${selectedProperty.title} ${button.dataset.label.toLowerCase()}`;
    propertyImageType.textContent = button.dataset.label;
    if (propertyMainImage.complete) propertyMainImage.classList.remove('is-changing');
  }, 180);
}

function openPropertyView(propertyKey) {
  selectedProperty = propertyData[propertyKey];
  if (!selectedProperty) return;
  const exterior = `assets/${selectedProperty.base}-exterior.webp`;
  propertyMainImage.src = exterior;
  propertyMainImage.alt = `${selectedProperty.title} exterior`;
  propertyImageType.textContent = 'Exterior';
  propertyTitle.textContent = selectedProperty.title;
  propertyThumbs.forEach(thumb => {
    const image = `assets/${selectedProperty.base}-${thumb.dataset.room}.webp`;
    thumb.dataset.image = image;
    thumb.classList.remove('is-active');
    const thumbnail = thumb.querySelector('img');
    thumbnail.src = image;
    thumbnail.alt = `${selectedProperty.title} ${thumb.dataset.label.toLowerCase()}`;
    const preload = new Image();
    preload.src = image;
  });
  setPropertyView(true);
}

propertyCards.forEach(card => card.addEventListener('click', () => openPropertyView(card.dataset.property)));
closeProperty?.addEventListener('click', () => {
  setPropertyView(false);
  propertyThumbs.forEach(thumb => thumb.classList.remove('is-active'));
});
propertyThumbs.forEach(thumb => thumb.addEventListener('click', () => showPropertyImage(thumb)));

function closeMenu() {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function resetContact() {
  contactScene.classList.remove('is-entering', 'show-panel');
  contactVideo.pause();
  contactVideo.currentTime = 0;
  contactBackgroundVideo.pause();
  contactBackgroundVideo.currentTime = 0;
}

function revealContactPanel() {
  contactScene.classList.add('is-entering', 'show-panel');
  contactBackgroundVideo.play().catch(() => {});
}

function playSceneVideo(view) {
  Object.entries(sceneVideos).forEach(([name, video]) => {
    if (name === view) {
      if (name === 'contact') video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}

function activateView(nextView, updateHistory = true) {
  if (!nextView || nextView === activeView) {
    closeMenu();
    return;
  }

  clearTimeout(transitionTimer);
  curtain.classList.add('is-on');

  setTimeout(() => {
    scenes.forEach(scene => scene.classList.toggle('is-active', scene.dataset.scene === nextView));
    navLinks.forEach(link => link.classList.toggle('is-active', link.dataset.view === nextView));
    if (activeView === 'contact') resetContact();
    activeView = nextView;

    playSceneVideo(nextView);
    if (nextView !== 'gallery') setPropertyView(false);

    if (updateHistory) history.replaceState(null, '', `#${nextView}`);
    curtain.classList.remove('is-on');
    closeMenu();

    if (nextView === 'contact') {
      setTimeout(() => contactScene.classList.add('is-entering'), 450);
    }
  }, 280);
}

viewTriggers.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    activateView(trigger.dataset.view);
  });
});

menuToggle.addEventListener('click', () => {
  const open = !menu.classList.contains('is-open');
  menu.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

contactVideo.addEventListener('ended', revealContactPanel);
skipIntro.addEventListener('click', revealContactPanel);

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Property enquiry: ${data.get('project')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nArea of interest: ${data.get('project')}\n\n${data.get('message')}`);
  formStatus.textContent = 'Opening your email app…';
  window.location.href = `mailto:admin@oliveyardproperties.com?subject=${subject}&body=${body}`;
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && galleryScene?.classList.contains('show-property')) setPropertyView(false);
  else if (event.key === 'Escape') closeMenu();
});

const initial = location.hash.slice(1);
if (['home', 'about', 'services', 'gallery', 'contact'].includes(initial) && initial !== 'home') {
  activateView(initial, false);
} else {
  sceneVideos.home.play().catch(() => {});
}
