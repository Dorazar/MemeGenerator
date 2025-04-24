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
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'red',
    },
  ],
}

function getMeme() {
  return gMeme
}

function findImgSelectedByMemeId() {
  const img = gImgs.find((img) => img.id === gMeme.selectedImgId)
  return img
}
