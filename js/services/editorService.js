'use strict';

let gMeme = _initMeme();

function _initMeme() {
  return {
    selectedImgId: null,
    selectedLineIdx: null,
    lines: [
      {
        txt: '',
        fontSize: 40,
        align: null,
        color: null,
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

function setLineTxt(txt, lineIdx) {
  gMeme.lines[lineIdx].txt = txt;
}
