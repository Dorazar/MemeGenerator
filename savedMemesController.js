'use strict'

var gSavedMemes = getSavedMems()
var KEY = 'savedMems'
var savedMeme = null
var loadMode = false

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

function renderSavedMemes() {
  document.querySelector('.saved-mems').innerHTML = gSavedMemes
    .map((meme, idx) => {
      const url = findImgSelectedByMemeId(meme.selectedImgId).url
      return `
            <div class=saved-meme-card>
            <img src="${meme.savedImg}" onclick="loadMeme('${meme.id}')"/>
            <button class="material-symbols-outlined" onclick="onDeleteSavedMeme(${idx})">delete</button>
            </div>
        `
    })
    .join('')
}

function getSavedMems() {
  gSavedMemes = loadFromLocalStorage(KEY)
  if (gSavedMemes && gSavedMemes.length > 0) {
    return gSavedMemes
  } else {
    gSavedMemes = []
    return gSavedMemes
  }
}

function onSaveMeme(elLink) {
  if (loadMode) {
    console.log('updated!')
    updateSaveMeme()
  } else if (!loadMode) {
    console.log('created!')
    createSaveMeme(elLink)
  }
  showSaveMessage()
}

//create

function createSaveMeme() {
  const meme = structuredClone(getMeme())
  meme.id = makeSavedId()
  const dataUrl = gElCanvas.toDataURL()
  meme.savedImg = dataUrl
  gSavedMemes.push(meme)
  savedMeme = meme
  saveToLocalStorage(KEY, gSavedMemes)
  console.log('saveSucessful:', meme)
}

//update

function updateSaveMeme() {
  console.log(savedMeme)
  const elInput = document.querySelector('.text-input')
  savedMeme.lines[savedMeme.selectedLineIdx].txt = elInput.value
  console.log('elInput.value:', elInput.value)
  console.log('look here:', savedMeme)
  saveToLocalStorage(KEY, gSavedMemes)
  loadMode = false
}

// load

function loadMeme(memeId) {
  loadMode = true
  savedMeme = findSavedMeme(memeId)

  if (!savedMeme) return console.warn('Meme not found')

  gMeme = structuredClone(savedMeme)

  const elInput = document.querySelector('.text-input')
  elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt

  setImg(gMeme.selectedImgId)

  document.fonts.ready.then(() => {
    renderMeme()
  })

  hideSavedMems()
  hideGallery()
  showMemeGenerator()
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
  toggleMenu()
}

function onSavedMemes() {
  hideMemeGenerator()
  hideGallery()
  showSavedMems()
  renderSavedMemes()
}

function showSaveMessage() {
  const elMessage = document.querySelector('.save-message')
  elMessage.classList.add('show')
  setTimeout(() => {
    elMessage.classList.remove('show')
  }, 2000)
}

function findSavedMeme(id) {
  const memes = getSavedMems()
  return memes.find((meme) => meme.id === id)
}

