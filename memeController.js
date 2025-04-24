'use strict'

var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')

function onInit() {
  // gElCanvas = document.querySelector('canvas')
  // gCtx = gElCanvas.getContext('2d')
  onResizeCanvas()
  renderMeme()
}

function renderMeme() {
  const memeImgSource = findImgSelectedByMemeId().url
  onDrawImg(memeImgSource)
  onWriteOnCanvas()
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
  gCtx.font = '40px Verdana'
  gCtx.fillStyle = 'yellow'

  const txt = 'Hello look at me!!!'
  //put the text in center
  const textWidth = gCtx.measureText(txt).width
  gCtx.fillText(txt, gElCanvas.width / 2 - textWidth / 2, 50)
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
  return pos
}
