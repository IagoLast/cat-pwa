const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const compression = require('compression');
const flickr = require('./lib/flickr/index');
const PORT = 3333;

const app = express();
app.use(compression({level:9}));
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


app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});