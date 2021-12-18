'use strict';

function deleteMemeById(id) {
  const memeToDeleteIdx = gUserMemes.findIndex(meme => meme.id === id);

  gUserMemes.splice(memeToDeleteIdx, 1);
  saveToStorage('userMemes', gUserMemes);
}

function getMemeById(id) {
  const meme = loadFromStorage('userMemes').find(meme => +meme.id === id);
  return meme;
}
