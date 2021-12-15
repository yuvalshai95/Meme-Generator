'use strict';

addBodyListener();

function onInit() {
  renderGallery();
  addListeners();

  //TODO: Move this code
  gCanvas = document.querySelector('#canvas');
  gCtx = gCanvas.getContext('2d');
  onDrawText('First Choose A Meme');
}

function renderGallery() {
  const imgs = getImgs();
  let strHTML = '';
  imgs.forEach(img => {
    strHTML += `<img src="${img.url}" data-id=${img.id} alt="">`;
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
function addListeners() {
  // Gallery Images
  const elImgs = document.querySelectorAll('.meme-gallery-container img');
  for (let img of elImgs) {
    const imgId = img.dataset.id;
    img.addEventListener('click', () => {
      onImgSelect(imgId);
    });
  }

  // Editor
  const elMemeText = document.querySelector('.control-txt');
  elMemeText.addEventListener('input', function () {
    onChangeText(this.value, 0);
  });

  const elIncreaseFontBtn = document.querySelector('.increase-font');
  elIncreaseFontBtn.addEventListener('click', () => {
    onChangeFontSize(1);
  });

  const elDecreaseFont = document.querySelector('.decrease-font');
  elDecreaseFont.addEventListener('click', () => {
    onChangeFontSize(-1);
  });
}
