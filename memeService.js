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
      size: 40,
      color: 'black',
      font: 'Bangers',
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
    font: 'Bangers',
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
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.pos.x -= 10
  renderMeme()
}

function onRightAlignMent() {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.pos.x += 10
  renderMeme()
}

function onTopAlignMent() {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.pos.y += 10
  renderMeme()
}

function onBottomAlignMent() {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.pos.y -= 10
  renderMeme()
}

//save to local storage saved mems

//fix

var gSavedMemes



var KEY = 'savedMems'

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
 return gSavedMemes.find
 (meme => meme.selectedImgId === gMeme.selectedImgId && meme.lines.txt ===gMeme.lines.txt)
}


function onSaveMeme() {
  gSavedMemes=getSavedMems()
  var double = searchForDoubleMemes()
  if (double) return
  gSavedMemes.push(gMeme)
  console.log(gSavedMemes)
  saveToLocalStorage(KEY, gSavedMemes)

}




function saveToLocalStorage(key, value) {
  const json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

function loadFromLocalStorage(key) {
  const json = localStorage.getItem(key)
  return JSON.parse(json)
}

