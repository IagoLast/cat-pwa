const express = require('express');
const flickr = require('./lib/flickr/index');

var app = express();
app.use(express.static(__dirname + '/public'));



app.get('/api/v1/pics', async (req, res) => {
  try {
    const pictures = await flickr.getPictures();
    res.json(pictures);
  } catch (e) {
    res.status(500);
  }

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});