'use strict'

var gElCanvas = document.querySelector('canvas')
var gCtx=gElCanvas.getContext('2d')


function onInit() {
  // gElCanvas = document.querySelector('canvas')
  // gCtx = gElCanvas.getContext('2d')
  //   onDrawImg()

  onResizeCanvas()
}

function renderMeme() {
  // לצייר תמונה על הקנבס ולכתוב טקסט על הקנבס
  // renders an image on the canvas and a line of text on top
}

function onResizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

onDrawImg()

function onDrawImg() {
  const img = new Image()
  img.src = 'meme-imgs/meme-imgs (square)/1.jpg'
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
}

// add write on canvas to onchange

onWriteOnCanvas()

function onWriteOnCanvas() {
  gCtx.font = '50px Verdana'
  gCtx.fillStyle = 'blue'
  const txt = 'abc'
  gCtx.fillText(txt, gElCanvas.width / 2 - txt.length, 50)
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