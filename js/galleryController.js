'use strict';

addBodyListener();

function onInit() {
  renderGallery();
  addGalleryListeners();
  addEditorListeners();

  //TODO: Move this code
  gCanvas = document.querySelector('#canvas');
  gCtx = gCanvas.getContext('2d');
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
  renderMeme();
}

function addBodyListener() {
  window.addEventListener('load', onInit);
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
}
