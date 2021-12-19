'use strict';

onInitMeme();
addBodyListener();

function onInit() {
  renderGallery();
  addGalleryListeners();
  addEditorListeners();
}

function renderGallery(searchBy) {
  const imgs = getImgs(searchBy);
  let strHTML = '';
  imgs.forEach(({ url, id }) => {
    strHTML += `<img src="./${url}" data-id=${id} alt="">`;
  });
  document.querySelector('.meme-gallery-container').innerHTML = strHTML;
}

function onImgSelect(imgId) {
  setMemeImgId(imgId);
  renderMeme();
  onChangeTab('editor');
}

function onChangeTab(toTab) {
  const elSearchSection = document.querySelector('.search-container');
  const elGallery = document.querySelector('.meme-gallery-container');
  const elEditor = document.querySelector('.canvas-container');
  const elAbout = document.querySelector('.about-container');
  const elSavedMemes = document.querySelector('.saved-meme-container');

  elSavedMemes.style.display = 'none';
  elSearchSection.style.display = 'none';
  elEditor.style.display = 'none';
  elGallery.style.display = 'none';
  elAbout.style.display = 'none';

  if (toTab === 'editor') {
    elEditor.style.display = 'flex';
    // TODO: change to method that remove active from all
    document.querySelector('.nav-gallery').classList.remove('active');
    document.querySelector('.nav-saved').classList.remove('active');
    resizeCanvas();
    renderMeme();
  } else if (toTab === 'gallery') {
    elSearchSection.style.display = 'flex';
    elGallery.style.display = 'grid';
    elAbout.style.display = 'flex';
    document.querySelector('.nav-saved').classList.remove('active');
  } else if (toTab === 'saved') {
    document.querySelector('.nav-gallery').classList.remove('active');
    document.querySelector('.nav-saved').classList.add('active');
    elSavedMemes.style.display = 'grid';
    elSearchSection.style.display = 'flex';
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
  for (let elImg of elImgs) {
    const imgId = elImg.dataset.id;
    elImg.addEventListener('click', () => {
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

  const elNavSaved = document.querySelector('.nav-saved');
  elNavSaved.addEventListener('click', () => {
    renderSavedMemes();
    onChangeTab('saved');
    toggleMenu();
    addSavedMemesListeners();
  });

  const elNavAbout = document.querySelector('.nav-about');
  elNavAbout.addEventListener('click', () => {
    // TODO: check if in phone sizes then toggle menu
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

  const elSearchTextInput = document.querySelector('input[name=search-txt]');
  elSearchTextInput.addEventListener('input', function () {
    renderGallery(this.value);
    addGalleryListeners();
  });

  const elSearchBarLis = document.querySelectorAll('.most-common li');
  for (let li of elSearchBarLis) {
    li.addEventListener('click', function () {
      renderGallery(li.innerText);
      addGalleryListeners();
    });
  }
}
