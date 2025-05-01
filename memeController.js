'use strict'

var gIsEditMode = false

var gElCanvas
var gCtx
var gElGallery
var gElEditor
function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  gElGallery = document.querySelector('.gallery')
  gElEditor = document.querySelector('.editor')

  renderGallery()
}

function renderMeme() {
  const { selectedImgId } = getMeme()

  const memeImgSource = findImgSelectedByMemeId(selectedImgId).url
  onDrawImg(memeImgSource)
}

function onResizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth
  renderMeme()
}

// onDrawImg()

function onDrawImg(imgSource) {
  const img = new Image()
  img.src = imgSource
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    onWriteOnCanvas()
  }
}

// add write on canvas to onchange

// onWriteOnCanvas()

function onWriteOnCanvas() {
  const lineSpacing = 10
  gMeme.lines.forEach((line, idx) => {
    gCtx.font = `${line.size}px Verdana`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillStyle = line.color

    //if the line not on gMeme,create it on center with spacing

    if (line.pos == null) {
      line.pos = {}
      line.pos.x = gElCanvas.width / 2
      line.pos.y = idx === 0 ? line.size : gMeme.lines[idx - 1].pos.y + line.size + lineSpacing
    }

    const textWidth = gCtx.measureText(line.txt).width

    gCtx.fillText(line.txt, line.pos.x, line.pos.y)

    if (gIsEditMode && gMeme.selectedLineIdx === idx) {
      const pad = 5
      const rectX = line.pos.x - textWidth / 2 - pad
      const rectY = line.pos.y - line.size / 2 - pad
      const rectW = textWidth + pad * 2
      const rectH = line.size + pad * 2

      gCtx.beginPath()
      gCtx.setLineDash([5, 3])
      gCtx.strokeStyle = 'black'
      gCtx.strokeRect(rectX, rectY, rectW, rectH)
      gCtx.setLineDash([])
    }

    line.pos.xStart = line.pos.x - textWidth / 2
    line.pos.xEnd = line.pos.x + textWidth / 2
    line.pos.yStart = line.pos.y - line.size / 2
    line.pos.yEnd = line.pos.y + line.size / 2
  })
}



function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (['touchstart', 'touchmove', 'touchend'].includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  console.log(pos)
  lineClicked(pos)
  return pos
}

function lineClicked(pos) {
  if (!gMeme.lines[gMeme.selectedLineIdx].pos) return

  var line = gMeme.lines.find(
    (line) =>
      (line.pos.xStart <= pos.x) & (line.pos.xEnd >= pos.x) & (line.pos.yStart <= pos.y) & (line.pos.yEnd >= pos.y)
  )
  if (!line) return
  console.log(line)

  const lineIdx = findLineIdx(line)
  gMeme.selectedLineIdx = lineIdx
  editLine(lineIdx)
}

function onSetLineTxt() {
  setLineTxt()
  gIsEditMode = true
  renderMeme()
}

function hideMemeGenerator() {
  gElEditor.style.display = 'none'
}

function showMemeGenerator() {
  gElEditor.style.display = 'grid'
}

function onImgSelect(imgId) {
  // const imgObj = findImgSelectedByMemeId(imgId)
  hideGallery()
  showMemeGenerator()
  setImg(imgId)
  onResizeCanvas()
  renderMeme()
}

function onDownloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  elLink.href = dataUrl
  console.log(elLink.href)
  elLink.download = 'yourMeme'
}

function onColorPicker(value) {
  setColor(value)
  renderMeme()
}

function onSetFontSize(value) {
  setFontSize(value)
  renderMeme()
}

function onAddTextLine() {
  addTextLine()
  switchLine()
  // clean the text input after add new line
  gIsEditMode = true
  let text = document.querySelector('.text-input')
  text.value = gMeme.lines[gMeme.selectedLineIdx].txt
  renderMeme()
}

function onSwitchLine() {
  switchLine()
}

function editLine(lineIdx) {
  gIsEditMode = true
  renderMeme()
  let text = document.querySelector('.text-input')
  text.value = gMeme.lines[lineIdx].txt
}

function onBlur() {
  gIsEditMode = false
  renderMeme()
}

function onFocus() {
  gIsEditMode = true
  onWriteOnCanvas()
}