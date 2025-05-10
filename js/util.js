'use strict'

function makeSavedId() {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = 5
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}


function saveToLocalStorage(key, value) {
  const json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

function loadFromLocalStorage(key) {
  const json = localStorage.getItem(key)
  return JSON.parse(json)
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}
