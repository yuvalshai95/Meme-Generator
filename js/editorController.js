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

  // no lines
  if (!meme.lines.length) return;

  meme.lines.forEach(line => {
    drawText(line);
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

function drawText(line) {
  let { txt, fontSize, align, color, outline, position, font } = line;
  if (!color) color = '#fff';
  if (!outline) outline = '#000';
  console.log('font', font);

  gCtx.lineWidth = 2;
  gCtx.strokeStyle = `${outline}`;
  gCtx.fillStyle = `${color}`;
  gCtx.font = `${fontSize}px ${font}`;
  gCtx.textAlign = align;
  gCtx.fillText(txt, position.x, position.y);
  gCtx.strokeText(txt, position.x, position.y);
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

function onSwitchLines() {
  switchLines();
  renderMeme();
}

function onChangeTextPosition(num) {
  changeTextPosition(num);
  renderMeme();
}

function onChangeTextAlign(alignTo) {
  changeTextAlign(alignTo);
  renderMeme();
}

function onChangeFont(font) {
  changeFont(font);
  renderMeme();
}

function onAddTextLine() {
  addLine();
  renderMeme();
}

function onDeleteText() {
  deleteLine();
  renderMeme();
}

// Listeners
function addEditorListeners() {
  const elMemeText = document.querySelector('.control-txt');
  elMemeText.addEventListener('input', function () {
    onChangeText(this.value);
  });

  const elIncreaseFontBtn = document.querySelector('.increase-font');
  elIncreaseFontBtn.addEventListener('click', () => {
    onChangeFontSize(1);
  });

  const elDecreaseFont = document.querySelector('.decrease-font');
  elDecreaseFont.addEventListener('click', () => {
    onChangeFontSize(-1);
  });

  const elFillColorInput = document.querySelector('input[name=fillColor]');
  elFillColorInput.addEventListener('input', function () {
    onChangeFillColor(this.value);
  });

  const elOutlineColorInput = document.querySelector('input[name=outlineColor]');
  elOutlineColorInput.addEventListener('input', function () {
    onChangeOutlineColor(this.value);
  });

  const switchLines = document.querySelector('.switch-lines');
  switchLines.addEventListener('click', onSwitchLines);

  const elUpText = document.querySelector('.up-text');
  elUpText.addEventListener('click', () => {
    onChangeTextPosition(-2);
  });

  const elDownText = document.querySelector('.down-text');
  elDownText.addEventListener('click', () => {
    onChangeTextPosition(2);
  });

  const elAlignTextRight = document.querySelector('.align-text-right');
  elAlignTextRight.addEventListener('click', () => {
    onChangeTextAlign('right');
  });

  const elAlignTextLeft = document.querySelector('.align-text-left');
  elAlignTextLeft.addEventListener('click', () => {
    onChangeTextAlign('left');
  });

  const elAlignTextCenter = document.querySelector('.align-text-center');
  elAlignTextCenter.addEventListener('click', () => {
    onChangeTextAlign('center');
  });

  const elFontSelect = document.querySelector('.control-select');
  elFontSelect.addEventListener('change', function () {
    onChangeFont(this.value);
  });

  const elAddText = document.querySelector('.add-text');
  elAddText.addEventListener('click', () => {
    onAddTextLine();
  });

  const elDeleteText = document.querySelector('.delete-text');
  elDeleteText.addEventListener('click', () => {
    onDeleteText();
  });
}
