'use strict'

var gId = -1
var gSavedGallery = []
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
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/8.jpg',
    keywords: ['hat'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/9.jpg',
    keywords: ['luaght', 'kid'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/12.jpg',
    keywords: ['haim', 'you'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/19.jpg',
    keywords: ['hi', 'wow'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/Ancient-Aliens.jpg',
    keywords: ['world'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/drevil.jpg',
    keywords: ['victory', 'me'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/img2.jpg',
    keywords: ['dance', 'child'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/img4.jpg',
    keywords: ['trum', 'yes'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/img5.jpg',
    keywords: ['baby', 'look'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/img6.jpg',
    keywords: ['dog', 'lay'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/img11.jpg',
    keywords: ['obamba', 'yes', 'laugth'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/img12.jpg',
    keywords: ['kiss'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/leo.jpg',
    keywords: ['wine', 'cheers'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/meme1.jpg',
    keywords: ['sunglasses', 'matrix'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/One-Does-Not-Simply.jpg',
    keywords: ['hair', 'see'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/Oprah-You-Get-A.jpg',
    keywords: ['opra', 'red'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/patrick.jpg',
    keywords: ['yes', 'you'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/putin.jpg',
    keywords: ['putin', 'tie'],
  },
  {
    id: makeId(),
    url: 'meme-imgs/meme-imgs (various aspect ratios)/X-Everywhere.jpg',
    keywords: ['toy', 'story'],
  },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  isDrag: false,
  lines: [
    {
      txt: 'write it!',
      size: 40,
      color: 'black',
      font: 'bangers',
    },
  ],
}

var gFilterImgs = []

function getImgs() {
  if (gFilterImgs.length > 0) {
    return gFilterImgs
  }
  return gImgs
}

function onFilterInput(value) {
  // console.log(value)

  value = value.toLowerCase().trim()

  gFilterImgs = gImgs.filter((img) => img.keywords.some((keyword) => keyword.toLowerCase().includes(value)))

  console.log('gFilterImgs:', gFilterImgs)
  if (gFilterImgs.length === 0) {
    gFilterImgs = []
  }
  renderGallery()
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
  var textWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
  // console.log(textWidth)
  // console.log(gMeme.lines[gMeme.selectedLineIdx].pos.xEnd)
  gMeme.lines[gMeme.selectedLineIdx].size += value
  gMeme.lines[gMeme.selectedLineIdx].pos.xEnd = gMeme.lines[gMeme.selectedLineIdx].pos.xStart + textWidth
  gMeme.lines[gMeme.selectedLineIdx].pos.yEnd += value
  // console.log(gMeme.lines[gMeme.selectedLineIdx].pos)
}

function addTextLine() {
  const newLine = {
    txt: 'write it!',
    size: 40,
    color: 'black',
    font: 'bangers',
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




function loadImgsFromLocal() {
  gSavedGallery = loadFromLocalStorage('savedGallery')

  if (!gSavedGallery) {
    saveToLocalStorage('savedGallery', gImgs)
  }

  gImgs = gSavedGallery
}

function saveImgToLocal() {
  saveToLocalStorage('savedGallery', gImgs)
}