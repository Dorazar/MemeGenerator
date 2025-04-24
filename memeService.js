'use strict'
var gImgs = [
  {
    id: 1,
    url: 'meme-imgs/meme-imgs (various aspect ratios)/2.jpg',
    keywords: ['funny', 'cat'],
  },
  {
    id: 5,
    url: 'meme-imgs/meme-imgs (various aspect ratios)/5.jpg',
    keywords: ['funny', 'cat'],
  },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: '',
      size: 80,
      color: 'red',
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
  gMeme.lines[0].txt = text.value
}