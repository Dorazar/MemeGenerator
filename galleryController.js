'use strict'

function renderGallery() {
  const elGalleryContainer = document.querySelector('.gallery')
  elGalleryContainer.innerHTML = gImgs
    .map((img) => `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`)
    .join('')
  addBtnGallry()
}

function addBtnGallry() {
  const elGalleryContainer = document.querySelector('.gallery')
  elGalleryContainer.innerHTML += `<button onclick="generateRandomMeme()">I'm flexible</button>`
}

function showGallery() {
  gElGallery.style.display = 'grid'

  resetGmeme()
  let text = document.querySelector('.text-input')
  text.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function hideGallery() {
  gElGallery.style.display = 'none'

  renderMeme()
}

function onGalleryNav() {
  hideMemeGenerator()
  showGallery()
}

function generateRandomMeme() {
  gIsRandomMeme = true
  var randomImgId = getRandomIntInclusive(0, gImgs.length - 1)

  var gMemePhrasesId = getRandomIntInclusive(0, gMemePhrases.length - 1)

  var randomPhrase = gMemePhrases[gMemePhrasesId]
  gMeme.selectedImgId = randomImgId

  gMeme.lines[0].txt = randomPhrase

  var textBox = document.querySelector('.text-input')
  textBox.value = randomPhrase

  onImgSelect(randomImgId)
  hideGallery()
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

function resetTextLine() {
  gMeme.lines[0].txt = 'write it!'
}

function resetGmeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'write it!',
        size: 20,
        color: '',
        font: 'lato',
      },
    ],
  }
}
