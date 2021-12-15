'use strict';

let gCanvas;
let gCtx;

function renderMeme() {
  const meme = getMeme();
  const memeImg = getSelectedImage(meme.selectedImgId);
  onDrawImg(memeImg.url);
  onDrawLines();
}

function onDrawLines() {
  gMeme.lines.forEach(line => {
    onDrawText(line.txt);
  });
}

function onDrawImg(imgUrl) {
  const img = new Image();
  img.src = imgUrl;
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onChangeText(txt, lineIdx) {
  setLineTxt(txt, lineIdx);
  renderMeme();
}

function onDrawText(txt, x = 50, y = 100) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.font = '40px Arial';
  gCtx.fillText(txt, x, y);
  gCtx.strokeText(txt, x, y);
}

function onChangeFontSize(size) {
  //   changeSize(size);
}
