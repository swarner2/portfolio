var express = require('express');
var app = express();
app.use(express.static('Blog_Site'));
app.get('/', function (req, res) {
  res.send('home.html');
});

var port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});