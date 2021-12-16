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
        font: 'Impact',
        align: 'left',
        color: '#fff',
        outline: '#000',
        position: { x: 70, y: 100 },
        isDrag: false,
      },
      {
        txt: '',
        fontSize: 40,
        font: 'Impact',
        align: 'left',
        color: '#fff',
        outline: '#000',
        position: { x: 70, y: 400 },
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
  if (!gMeme.lines.length) return;
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function changeSize(num) {
  if (!gMeme.lines.length) return;
  const lineIdx = gMeme.selectedLineIdx;
  const memeFont = gMeme.lines[lineIdx].fontSize;
  if (memeFont <= 25 || memeFont >= 110) return;
  gMeme.lines[lineIdx].fontSize += num;
}

function setFillColor(color) {
  if (!gMeme.lines.length) return;
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setOutlineColor(color) {
  if (!gMeme.lines.length) return;
  gMeme.lines[gMeme.selectedLineIdx].outline = color;
}

function switchLines() {
  //   gMeme.selectedLineIdx = gMeme.selectedLineIdx === 0 ? 1 : 0;
  if (!gMeme.lines.length) return;
  // On last line go back to first line
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  } else {
    // Move to next line
    gMeme.selectedLineIdx++;
  }
}

function changeTextPosition(num) {
  if (!gMeme.lines.length) return;
  gMeme.lines[gMeme.selectedLineIdx].position.y += num;
}

function changeTextAlign(alignTo) {
  if (!gMeme.lines.length) return;
  gMeme.lines[gMeme.selectedLineIdx].align = alignTo;
}

function changeFont(font) {
  if (!gMeme.lines.length) return;
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function addLine() {
  const line = {
    txt: 'New Text',
    fontSize: '40',
    font: 'Impact',
    align: 'left',
    color: '#fff',
    outline: '#000',
    position: { x: 70, y: 250 },
    isDrag: false,
  };

  // Add new line to lines array
  gMeme.lines.push(line);
  // Update line idx to current text
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine() {
  if (!gMeme.lines.length) return;
  if (gMeme.lines.length === 1) {
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
    return;
  }
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx--;
  if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 0;
}
