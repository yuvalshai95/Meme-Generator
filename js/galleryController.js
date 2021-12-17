'use strict';

onInitMeme();
addBodyListener();

function onInit() {
  renderGallery();
  addGalleryListeners();
  addEditorListeners();
}

function renderGallery() {
  const imgs = getImgs();
  let strHTML = '';
  imgs.forEach(img => {
    strHTML += `<img src="./${img.url}" data-id=${img.id} alt="">`;
  });
  document.querySelector('.meme-gallery-container').innerHTML = strHTML;
}

function onImgSelect(imgId) {
  setMemeImgId(imgId);
  onChangeTab('editor');
  renderMeme();
}

function onChangeTab(toTab) {
  const elSearchSection = document.querySelector('.search-container');
  const elGallery = document.querySelector('.meme-gallery-container');
  const elEditor = document.querySelector('.canvas-container');
  const elAbout = document.querySelector('.about-container');

  elSearchSection.style.display = 'none';
  elEditor.style.display = 'none';
  elGallery.style.display = 'none';
  elAbout.style.display = 'none';

  if (toTab === 'editor') {
    elEditor.style.display = 'flex';
    document.querySelector('.nav-gallery').classList.remove('active');
    resizeCanvas();
    renderMeme();
  } else if (toTab === 'gallery') {
    elSearchSection.style.display = 'flex';
    elGallery.style.display = 'grid';
    elAbout.style.display = 'flex';
  }
}

function addBodyListener() {
  window.addEventListener('load', onInit);
  window.addEventListener('resize', () => {
    resizeCanvas();
    renderMeme();
  });
  document.querySelector('.canvas-container').style.display = 'none';
}

function toggleMenu() {
  document.querySelector('body').classList.toggle('menu-open');
}

// Listeners
function addGalleryListeners() {
  // Gallery Images
  const elImgs = document.querySelectorAll('.meme-gallery-container img');
  for (let img of elImgs) {
    const imgId = img.dataset.id;
    img.addEventListener('click', () => {
      onImgSelect(imgId);
    });
  }

  const elNavLogo = document.querySelector('.main-nav .logo');
  elNavLogo.addEventListener('click', () => {
    onChangeTab('gallery');
    document.querySelector('.nav-gallery').classList.add('active');
  });

  const elNavGallery = document.querySelector('.nav-gallery');
  elNavGallery.addEventListener('click', () => {
    onChangeTab('gallery');
    document.querySelector('.nav-gallery').classList.add('active');
    toggleMenu();
  });

  const elNavAbout = document.querySelector('.nav-about');
  elNavAbout.addEventListener('click', () => {
    toggleMenu();
  });

  const elMainScreen = document.querySelector('.main-screen');
  elMainScreen.addEventListener('click', () => {
    toggleMenu();
  });

  const elHamburger = document.querySelector('.btn-menu-toggle');
  elHamburger.addEventListener('click', () => {
    toggleMenu();
  });
}
