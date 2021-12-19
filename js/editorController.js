'use strict';

// Canvas
let gCanvas;
let gCtx;

// Drag&Drop
let gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInitMeme() {
  gCanvas = document.querySelector('#canvas');
  gCtx = gCanvas.getContext('2d');
  resizeCanvas();
}

function renderMeme() {
  onDrawImg();
  onDrawText();
}

function renderRecOnText(line) {
  if (line.align === 'left') {
    drawRec(
      line.position.x - 10,
      line.position.y - line.fontSize,
      line.txt.length * (0.55 * line.fontSize),
      1.2 * line.fontSize
    );
  } else if (line.align === 'center') {
    drawRec(
      line.position.x - 10 - (line.txt.length * 0.5 * line.fontSize) / 2,
      line.position.y - 1 * line.fontSize,
      line.txt.length * (0.55 * line.fontSize),
      1.2 * line.fontSize
    );
  } else {
    drawRec(
      line.position.x - 10 - line.txt.length * 0.5 * line.fontSize,
      line.position.y - line.fontSize,
      line.txt.length * (0.55 * line.fontSize),
      1.2 * line.fontSize
    );
  }
}

function drawRec(x, y, width, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, width + 10, height);
  gCtx.strokeStyle = '#ffffff';
  gCtx.stroke();
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
  const currLine = getDragLine();
  renderRecOnText(currLine);
}

function drawText(line) {
  let { txt, fontSize, align, color, outline, position, font } = line;

  gCtx.lineWidth = 2;
  gCtx.strokeStyle = `${outline}`;
  gCtx.fillStyle = `${color}`;
  gCtx.font = `${fontSize}px ${font}`;
  gCtx.textAlign = align;
  gCtx.fillText(txt, position.x, position.y);
  gCtx.strokeText(txt, position.x, position.y);
}

function resizeCanvas() {
  const elCanvasControl = document.querySelector('.canvas-control');
  gCanvas.width = elCanvasControl.offsetWidth;
  gCanvas.height = elCanvasControl.offsetHeight;
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
  const currLine = getDragLine();
  renderRecOnText(currLine);
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
  const currLine = getDragLine();
  renderRecOnText(currLine);
}

function onDeleteText() {
  deleteLine();
  renderMeme();
}

function onDown(ev) {
  const clickedPos = getEvPos(ev);
  if (!isLineClicked(clickedPos)) return;
  gStartPos = clickedPos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  const line = getDragLine();
  if (!line) return;
  if (line.isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveLine(dx, dy);
    gStartPos = pos;
    renderMeme();
    renderRecOnText(line);
  }
}

function onUp() {
  setLineDrag();
  const currLine = getDragLine();
  renderRecOnText(currLine);
  document.body.style.cursor = 'auto';

  //Clear Rect from text
  renderMeme();
}

function onClearTextInput() {
  const elMemeText = document.querySelector('.control-txt');
  elMemeText.value = '';
}

function onSetTextInput(sticker) {
  const elMemeText = document.querySelector('.control-txt');
  elMemeText.value = sticker;
}

function onSaveMeme() {
  const memeUrl = gCanvas.toDataURL('image/png', 'image/jpeg');
  saveUserMeme(memeUrl);
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
  switchLines.addEventListener('click', () => {
    onSwitchLines();
    onClearTextInput();
  });

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
    onClearTextInput();
  });

  const elDeleteText = document.querySelector('.delete-text');
  elDeleteText.addEventListener('click', () => {
    onDeleteText();
  });

  const elSaveMemeBtn = document.querySelector('.save-btn');
  elSaveMemeBtn.addEventListener('click', () => {
    renderMeme();
    onSaveMeme();
    const elModal = document.querySelector('.saved-meme-screen-modal');
    elModal.style.opacity = 1;
    setTimeout(() => {
      elModal.style.opacity = 0;
    }, 1000);
    resetMeme();
    onClearTextInput();
    addSavedMemesListeners();
  });

  const elStickers = document.querySelectorAll('.sticker');
  for (let sticker of elStickers) {
    sticker.addEventListener('click', () => {
      addLine(sticker.innerText);
      renderMeme();
    });
  }

  const elDownloadLink = document.querySelector('.download-btn a');
  elDownloadLink.addEventListener('click', function () {
    renderMeme();
    downloadMeme(this);
  });

  // Mouse
  gCanvas.addEventListener('mousedown', onDown);
  gCanvas.addEventListener('mousemove', onMove);
  gCanvas.addEventListener('mouseup', onUp);

  // Touch
  gCanvas.addEventListener('touchstart', onDown);
  gCanvas.addEventListener('touchmove', onMove);
  gCanvas.addEventListener('touchend', onUp);
}
