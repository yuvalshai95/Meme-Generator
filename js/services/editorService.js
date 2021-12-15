'use strict';

let gMeme = _initMeme();

function _initMeme() {
  return {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
      {
        txt: '',
        fontSize: 40,
        align: null,
        color: null,
        outline: null,
        position: { x: 50, y: 100 },
        isDrag: false,
      },
      {
        txt: '',
        fontSize: 40,
        align: null,
        color: null,
        outline: null,
        position: { x: 50, y: 400 },
        isDrag: false,
      },
    ],
    isDrag: false,
  };
}

function getMeme() {
  return gMeme;
}

function setMemeImgId(imgId) {
  gMeme.selectedImgId = imgId;
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function changeSize(num) {
  const lineIdx = gMeme.selectedLineIdx;
  const memeFont = gMeme.lines[lineIdx].fontSize;
  if (memeFont <= 25 || memeFont >= 110) return;
  gMeme.lines[lineIdx].fontSize += num;
}

function setFillColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setOutlineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].outline = color;
}

function switchLines() {
  gMeme.selectedLineIdx = gMeme.selectedLineIdx === 0 ? 1 : 0;
}

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
}
