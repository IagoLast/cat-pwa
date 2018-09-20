const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));


app.get('/api/v1/hello', function (req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});