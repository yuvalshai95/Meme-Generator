'use strict';

function renderSavedMemes() {
  const savedMemes = getSavedMemes();
  if (!savedMemes.length) {
    const elSavedMemes = document.querySelector('.saved-meme-container');
    elSavedMemes.innerHTML = '';
    const elNoMemesTitle = document.createElement('h2');
    elNoMemesTitle.innerText = "You don't have any saved memes";
    elSavedMemes.append(elNoMemesTitle);
  } else {
    let strHTML = '';
    savedMemes.forEach(({ canvasImg, id }) => {
      strHTML += `<div class="saved-meme">
                    <img src="${canvasImg}" data-id=${id} alt="meme">
                    <a class="delete-saved-meme" data-id=${id}>Delete</a>
                  </div>`;
    });

    document.querySelector('.saved-meme-container').innerHTML = strHTML;
  }
}

function onEditMemeById(id) {
  const meme = getMemeById(id);
  gMeme = meme;
  renderMeme();
  setTimeout(() => {
    onChangeTab('editor');
  }, 250);
}

function onDeleteMemeById(id) {
  deleteMemeById(id);
  renderSavedMemes();
}

function addSavedMemesListeners() {
  const elSavedMemes = document.querySelectorAll('.saved-meme img');
  for (let elSavedImg of elSavedMemes) {
    elSavedImg.addEventListener('click', () => {
      onEditMemeById(+elSavedImg.dataset.id);
    });
  }

  const elDeleteBtns = document.querySelectorAll('.delete-saved-meme');
  for (let elDeleteBtn of elDeleteBtns) {
    elDeleteBtn.addEventListener('click', () => {
      onDeleteMemeById(+elDeleteBtn.dataset.id);
      addSavedMemesListeners();
    });
  }
}
