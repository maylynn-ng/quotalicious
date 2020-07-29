const fetch = require('node-fetch');

function randomQuote () {
  return fetch('https://quote-garden.herokuapp.com/api/v2/quotes/random')
    .then(res => res.json())
}

function randomPicture () {
  return fetch('https://picsum.photos/412/732?')
}

module.exports = {
  randomQuote,
  randomPicture
}