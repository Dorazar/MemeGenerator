'use strict'

function renderGallery() {
  const galleryRender = gImgs.map((img) => `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">`).join('')

  const elGalleryContainer = document.querySelector('.gallery')
  elGalleryContainer.innerHTML = `<button onclick="generateRandomMeme()">I'm flexible</button>`
  elGalleryContainer.innerHTML += galleryRender
}

function showGallery() {
  gElGallery.style.display = 'grid'

  resetGmeme()
  let text = document.querySelector('.text-input')
  text.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function hideGallery() {
  gElGallery.style.display = 'none'

  renderMeme()
}

function onGalleryNav() {
  hideMemeGenerator()
  hideSavedMems()
  showGallery()
}

function generateRandomMeme() {
  gIsRandomMeme = true
  var randomImgId = getRandomIntInclusive(0, gImgs.length - 1)

  var gMemePhrasesId = getRandomIntInclusive(0, gMemePhrases.length - 1)

  var randomPhrase = gMemePhrases[gMemePhrasesId]
  gMeme.selectedImgId = randomImgId

  gMeme.lines[0].txt = randomPhrase

  var textBox = document.querySelector('.text-input')
  textBox.value = randomPhrase

  onImgSelect(randomImgId)
  hideGallery()
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

function resetTextLine() {
  gMeme.lines[0].txt = 'write it!'
}

function resetGmeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'write it!',
        size: 40,
        color: '',
        font: 'lato',
      },
    ],
  }
}


// share on facebook

function onShareImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  // After a succesful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
      const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

  }
  uploadImg(canvasData, onSuccess)
}


// on submit call to this function

async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = 'webify'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const formData = new FormData()
  formData.append('file', imgData)
  formData.append('upload_preset', 'webify')
  try {
      const res = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: formData
      })
      const data = await res.json()
      console.log('Cloudinary response:', data)
      onSuccess(data.secure_url)

  } catch (err) {
      console.log(err)
  }
}


