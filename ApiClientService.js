const fetch = require('node-fetch');

function getKanye () {
  return fetch('https://api.kanye.rest')
    .then(res => res.json())
}

function getTaylor () {
  return fetch('https://api.taylor.rest/')
    .then(res => res.json())
}

function getDonald () {
  return fetch('https://www.tronalddump.io/random/quote')
    .then(res => res.json())
}

function randomQuote () {
  return fetch('https://quote-garden.herokuapp.com/api/v2/quotes/random')
    .then(res => res.json())
}

function randomPicture () {
  return fetch('https://picsum.photos/412/732?')
}

function pictureBW () {
  return fetch('https://picsum.photos/412/732?grayscale')
}

function pictureBlur () {
  return fetch('https://picsum.photos/412/732?blur=3')
}

module.exports = {
  randomQuote,
  randomPicture,
  getKanye,
  getTaylor,
  getDonald,
  pictureBW,
  pictureBlur,
}