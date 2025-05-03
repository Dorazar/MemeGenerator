'use strict'
function renderSavedMemes() {
  const memes = getSavedMems()
//   console.log(memes)
  document.querySelector('.saved-mems').innerHTML = memes
    .map((meme, idx) => {
      const url = findImgSelectedByMemeId(meme.selectedImgId).url
      return `
            <div class=saved-meme-card>
            <img src="${url}" onclick="loadMeme(${idx})"/>
            <button class="material-symbols-outlined" onclick="onDeleteSavedMeme(${idx})">delete</button>
            </div>
        `
    })
    .join('')
}

function loadMeme(idx) {
  const memes = getSavedMems()
  gMeme = memes[idx]
  console.log(gMeme)
  hideGallery()
  showMemeGenerator()
  setImg(memes[idx].selectedImgId)
  onResizeCanvas()

  if (!gIsRandomMeme) {
    resetTextLine()
  }
  gIsRandomMeme = false
  renderSavedMemes()
  hideSavedMems()
}

function onDeleteSavedMeme(idx) {
  const mems = getSavedMems()
  mems.splice(idx, 1)
  saveToLocalStorage(KEY, mems)
  renderSavedMemes()
}

function hideSavedMems() {
  const elSavedMems = document.querySelector('.saved-mems')
  elSavedMems.style.display = 'none'
}

function showSavedMems() {
  const elSavedMems = document.querySelector('.saved-mems')
  elSavedMems.style.display = 'grid'
}

