'use strict'

var gSavedMemes

var KEY = 'savedMems'

function renderSavedMemes() {
  const memes = getSavedMems()

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

// load

function loadMeme(idx) {
  const memes = getSavedMems()
  const savedMeme = memes[idx]

  gMeme = structuredClone(savedMeme)

  const elInput = document.querySelector('.text-input')
  elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt

  setImg(gMeme.selectedImgId)
  renderMeme()
  hideSavedMems()
  hideGallery()
  showMemeGenerator()
  onWriteOnCanvas()
  onResizeCanvas()
}

// delete

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

const gMemePhrases = [
  'When you have that day',
  'Me vs. my emails',
  'Life before and after coffee',
  'Nothing beats the weekend',
  'Monday starts again',
  'Found a free half-hour',
  'Once in a lifetime',
  'Nothing like good music',
  'A day without hugs',
  'Just me being me',
]

function onSavedMemes() {
  hideMemeGenerator()
  hideGallery()
  showSavedMems()
  renderSavedMemes()
}

//save to local storage saved mems

function getSavedMems() {
  gSavedMemes = loadFromLocalStorage(KEY)
  if (gSavedMemes && gSavedMemes.length > 0) {
    return gSavedMemes
  } else {
    gSavedMemes = []

    return gSavedMemes
  }
}

// check if you have the same text and pic twice, if true, return

function searchForDoubleMemes() {
  return gSavedMemes.find((meme) => (meme.selectedImgId === gMeme.selectedImgId) & (meme.lines.txt === gMeme.lines.txt))
}

function onSaveMeme() {
  const text = document.querySelector('.text-input').value
  gMeme.lines[gMeme.selectedLineIdx].txt = text

  onWriteOnCanvas()

  const memeCopy = structuredClone(gMeme)

  const savedMemes = getSavedMems()
  savedMemes.push(memeCopy)
  saveToLocalStorage(KEY, savedMemes)
}

function saveToLocalStorage(key, value) {
  const json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

function loadFromLocalStorage(key) {
  const json = localStorage.getItem(key)
  return JSON.parse(json)
}
