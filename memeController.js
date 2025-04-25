'use strict'

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
  gMeme.lines.forEach((line, idx) => {
    gCtx.font = `${line.size}px Verdana`
    gCtx.fillStyle = line.color
    // put the text in center
    const textWidth = gCtx.measureText(line.txt).width

    gCtx.fillText(line.txt, gElCanvas.width / 2 - textWidth / 2, 20 + 20 * idx)
    //draw a frame around the selected line
    if (gMeme.selectedLineIdx === idx) {
      gCtx.strokeStyle = 'black'
      gCtx.rect(
        gElCanvas.width / 2 - textWidth / 2,
        20 + 20 * idx - line.size,
        // good
        textWidth,
        line.size + 2
      )
      gCtx.stroke()
    }
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
  // console.log(pos)
  return pos
}

function onSetLineTxt() {
  setLineTxt()
  renderMeme()
}

function hideMemeGenerator() {
  gElEditor.style.display = 'none'
}

function showMemeGenerator() {
  gElEditor.style.display = 'block'
}

function onImgSelect(imgId) {
  // const imgObj = findImgSelectedByMemeId(imgId)
  hideGallery()
  showMemeGenerator()
  setImg(imgId)
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
  // clean the text input after add new line
  let text = document.querySelector('.text-input')
  text.value = ''
}

function onSwitchLine() {
  switchLine()
}
