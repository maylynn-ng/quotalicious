const fetch = require('node-fetch');

const kanyeQuotes = 'https://api.kanye.rest';
  // { quote: "string" }
  // { quoteText: "string",
  //   quoteAuthor: "Kanye West" }

function getKanye () {
  return fetch('https://api.kanye.rest')
    .then(res => res.json())
}

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