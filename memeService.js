'use strict'

var gImgs = [
  {
    id: 0,
    url: 'meme-imgs/meme-imgs (various aspect ratios)/2.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 1,
    url: 'meme-imgs/meme-imgs (various aspect ratios)/5.jpg',
    keywords: ['kid', 'yes'],
  },

  {
    id: 2,
    url: 'meme-imgs/meme-imgs (various aspect ratios)/003.jpg',
    keywords: ['funny', 'trump'],
  },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Write it!',
      size: 20,
      color: '',
    },
  ],
}

function getMeme() {
  return gMeme
}

function findImgSelectedByMemeId(id) {
  const img = gImgs.find((img) => img.id === id)
  return img
}

function setLineTxt() {
  let text = document.querySelector('.text-input')
  gMeme.lines[gMeme.selectedLineIdx].txt = text.value
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setColor(value) {
  gMeme.lines[gMeme.selectedLineIdx].color = value
}

function setFontSize(value) {
  gMeme.lines[gMeme.selectedLineIdx].size += value
}

function addTextLine() {
  const newLine = {
    txt: 'write it!',
    size: 20,
    color: '',
  }
  gMeme.lines.push(newLine)
  // gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function findLineIdx(searchLine) {
  const lineIdx = gMeme.lines.findIndex((line) => line === searchLine)
  return lineIdx
}