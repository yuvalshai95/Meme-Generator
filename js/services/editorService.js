'use strict';

let gMeme = _initMeme();

function _initMeme() {
  return {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'New Text',
        fontSize: 40,
        font: 'Impact',
        align: 'left',
        color: '#fff',
        outline: '#000',
        position: { x: 100, y: 100 },
        isDrag: false,
      },
    ],
  };
}

function resetMeme() {
  gMeme = _initMeme();
}

function saveUserMeme(memeUrl) {
  gMeme.id = getRandomId();
  gMeme.canvasImg = memeUrl;
  gUserMemes.push(gMeme);
  saveToStorage('userMemes', gUserMemes);
}

function getDragLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
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
  if (alignTo === 'left') var x = gCanvas.width / 10;
  if (alignTo === 'center') var x = gCanvas.width / 2;
  if (alignTo === 'right') var x = gCanvas.width - gCanvas.width / 10;
  gMeme.lines[gMeme.selectedLineIdx].position.x = x;
}

function changeFont(font) {
  if (!gMeme.lines.length) return;
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function addLine(txt) {
  const linesCount = gMeme.lines.length;
  const lineTxt = !txt ? 'New Text' : txt;
  if (linesCount === 1) {
    var posY = gCanvas.height - 55;
  } else if (linesCount >= 2) {
    var posY = 200;
  }

  const line = {
    txt: `${lineTxt}`,
    fontSize: '40',
    font: 'Impact',
    align: 'left',
    color: '#fff',
    outline: '#000',
    position: { x: 70, y: posY },
    isDrag: false,
  };
  gMeme.lines.push(line);
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

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].position.x += dx;
  gMeme.lines[gMeme.selectedLineIdx].position.y += dy;
}

function setLineDrag() {
  if (!gMeme.isDrag) return;
  gMeme.lines[gMeme.selectedLineIdx].isDrag = false;
  gMeme.isDrag = false;
}

function isLineClicked(clickedPos) {
  const lineIdx = gMeme.lines.findIndex(function (line) {
    if (line.align === 'left') {
      return (
        clickedPos.x > line.position.x &&
        clickedPos.x < line.position.x + (line.fontSize / 2) * line.txt.length &&
        clickedPos.y < line.position.y &&
        clickedPos.y > line.position.y - line.fontSize
      );
    } else if (line.align === 'center') {
      const halfWordPx = ((line.fontSize / 2) * line.txt.length) / 2;
      return (
        clickedPos.x > line.position.x - halfWordPx &&
        clickedPos.x < line.position.x + halfWordPx &&
        clickedPos.y < line.position.y &&
        clickedPos.y > line.position.y - line.fontSize
      );
    } else {
      return (
        (clickedPos.x > line.position.x - (line.fontSize / 2) * line.txt.length) &
          (clickedPos.x < line.position.x) &&
        clickedPos.y < line.position.y &&
        clickedPos.y > line.position.y - line.fontSize
      );
    }
  });

  if (lineIdx === -1) return false;
  gMeme.selectedLineIdx = lineIdx;
  gMeme.lines[lineIdx].isDrag = true;
  gMeme.isDrag = true;
  return true;
}
