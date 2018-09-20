const fetch = require('node-fetch');
const {
  api_key
} = require('../../config/dev.json');


async function getPictures(tags = 'cats') {
  const rawResponse = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&format=json&nojsoncallback=1`);
  const response = await rawResponse.json();
  return response.photos.photo;
}

module.exports = {
  getPictures
};