const fetch = require('node-fetch');
const {
  api_key
} = require('../../config/dev.json');

// https://www.flickr.com/services/api/flickr.photos.search.html#yui_3_11_0_1_1537461393936_336
const extras = 'description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_m, url_l';


async function getPictures(tags = 'cats') {
  const rawResponse = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&extras=${extras}&format=json&nojsoncallback=1`);
  const response = await rawResponse.json();
  return response.photos.photo;
}

module.exports = {
  getPictures
};