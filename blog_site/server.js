var express = require('express');
var app = express();
var path = require('path');

var currPath =  path.join(__dirname);


app.use(express.static('Blog_Site'));
app.get('/', function (req, res) {
  res.sendFile( currPath + '/home.html' );
});
app.get('/toDo', function (req, res) {
  res.sendFile( currPath + '/toDo.html');
});
app.get('/about', function (req, res) {
  res.sendFile( currPath + '/toDo.html');
});


var port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});