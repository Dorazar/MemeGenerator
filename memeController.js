'use strict'

var gElCanvas = document.querySelector('canvas')
var gCtx=gElCanvas.getContext('2d')


function onInit() {
    // gElCanvas = document.querySelector('canvas')
    // gCtx = gElCanvas.getContext('2d')
    onResizeCanvas()
}




function renderMeme() {


    // renders an image on the canvas and a line of text on top


}

function onResizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height=elContainer.offsetHeight
}