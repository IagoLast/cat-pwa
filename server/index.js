const express = require('express');
const cors = require('cors');

const flickr = require('./lib/flickr/index');

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));


app.get('/api/v1/pics/:page', async (req, res) => {
  try {
    const pictures = await flickr.getPictures('cats, kitten', req.params.page);
    res.json(pictures);
  } catch (e) {
    res.status(500);
  }
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});