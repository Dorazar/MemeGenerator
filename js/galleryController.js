'use strict'

function renderGallery() {
  const imgs = getImgs()
  const galleryRender = imgs
    .map(
      (img) => `<img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">
      
      
  `
    )
    .join('')

  const elGalleryContainer = document.querySelector('.gallery')
  elGalleryContainer.innerHTML = `
  <label class="upload-btn">
    <span class="material-symbols-outlined upload-icon">upload</span>
    <input type="file" accept="image/*" hidden onchange="onImgUpload(event)">
  </label>
  <button class="im-flexible" onclick="generateRandomMeme()">I'm flexible</button>
`
  elGalleryContainer.innerHTML += galleryRender
}

function showGallery() {
  document.querySelector('.gallery-container').style.display = 'grid'
  gElGallery.style.display = 'grid'

  resetGmeme()
  let text = document.querySelector('.text-input')
  text.value = gMeme.lines[gMeme.selectedLineIdx].txt
  toggleMenu()
}

function hideGallery() {
  gElGallery.style.display = 'none'
  document.querySelector('.gallery-container').style.display = 'none'
  document.fonts.ready.then(() => {
    renderMeme()
  })
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

function resetTextLine() {
  gMeme.lines[0].txt = 'write it!'
}

function resetGmeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    isDrag: false,
    lines: [
      {
        txt: 'write it!',
        size: 40,
        color: '',
        font: 'bangers',
      },
    ],
  }
}

// share on facebook

function onShareImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')
  const shareWindow = window.open('about:blank', '_blank')

  uploadImg(canvasData, (uploadedImgUrl) => {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}`
    shareWindow.location.href = shareUrl
  })
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
      body: formData,
    })
    const data = await res.json()
    console.log('Cloudinary response:', data)
    onSuccess(data.secure_url)
  } catch (err) {
    console.log(err)
  }
}
