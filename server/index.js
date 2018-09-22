const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const flickr = require('./lib/flickr/index');


const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));

const cache = new NodeCache({
  stdTTL: 30
});


app.get('/api/v1/pics/:page', async (req, res) => {
  try {
    if (cache.get(req.url)) {
      return res.json(cache.get(req.url));
    }
    const pictures = await flickr.getPictures('cats, kitten', req.params.page);
    cache.set(req.url, pictures);
    res.json(pictures);
  } catch (e) {
    res.status(500);
  }
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});