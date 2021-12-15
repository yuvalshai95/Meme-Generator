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

//TODO: not only first line
function setLineTxt(txt) {
  gMeme.lines[0].txt = txt;
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
