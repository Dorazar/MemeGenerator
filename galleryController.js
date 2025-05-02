'use strict'




function renderGallery() {
    
    const elGalleryContainer = document.querySelector('.gallery')
    elGalleryContainer.innerHTML = gImgs
      .map(
        (img) =>
          `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`
      )
      .join('')

}


function showGallery() {
    gElGallery.style.display = 'grid'

}

function hideGallery() {
    gElGallery.style.display='none'
    renderMeme()
 
}


function onGalleryNav() {
    hideMemeGenerator()
    showGallery()
    
  }
  