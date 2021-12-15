'use strict';

let gCanvas;
let gCtx;

function renderMeme() {
  //   const meme = getMeme();
  //   console.log('meme', meme);
  onDrawImg();
  onDrawText();
}

function onDrawText() {
  const meme = getMeme();
  // if user did noy choose an img
  if (!meme.selectedImgId) return;

  meme.lines.forEach(line => {
    drawText(line.txt, line.fontSize, line.color, line.outline, line.position.x, line.position.y);
  });
}

function onDrawImg() {
  const meme = getMeme();
  // if user did noy choose an img
  if (!meme.selectedImgId) return;

  const memeImg = getSelectedImage(meme.selectedImgId);
  const img = new Image();
  img.src = memeImg.url;
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onChangeText(txt) {
  setLineTxt(txt);
  renderMeme();
}

function drawText(txt, txtSize = 40, fillColor = '#fff', outlineColor = '#000', x = 50, y = 100) {
  if (!fillColor) fillColor = '#fff';
  if (!outlineColor) outlineColor = '#000';

  gCtx.lineWidth = 2;
  gCtx.strokeStyle = `${outlineColor}`;
  gCtx.fillStyle = `${fillColor}`;
  gCtx.font = `${txtSize}px Arial`;
  gCtx.fillText(txt, x, y);
  gCtx.strokeText(txt, x, y);
}

function onChangeFontSize(size) {
  changeSize(size);
  renderMeme();
}

function onChangeFillColor(color) {
  setFillColor(color);
  renderMeme();
}

function onChangeOutlineColor(color) {
  setOutlineColor(color);
  renderMeme();
}
