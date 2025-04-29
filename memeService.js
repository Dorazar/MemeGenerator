'use strict'

var gId = -1

var gImgs = [
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/2.jpg',
    keywords: ['funny', 'mountain'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/5.jpg',
    keywords: ['kid', 'yes', 'funny'],
  },

  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/003.jpg',
    keywords: ['funny', 'trump'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/004.jpg',
    keywords: ['dogs', 'kiss'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/005.jpg',
    keywords: ['dog', 'baby'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/006.jpg',
    keywords: ['cat', 'keyboard'],
  },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'write it!',
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
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function findLineIdx(searchLine) {
  const lineIdx = gMeme.lines.findIndex((line) => line === searchLine)
  return lineIdx
}

function makeId() {
  return (gId += 1)
}

function onLeftAlignMent() {
  gMeme.lines[gMeme.selectedLineIdx].pos.xStart = 0
  console.log(gMeme.lines[gMeme.selectedLineIdx].pos)
  renderMeme()
}