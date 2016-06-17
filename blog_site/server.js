var express = require('express');
var app = express();
var path = require('path');

var currPath =  path.join(__dirname);

var listData = {
	toDo: ['dishes','laundry','baths (I am stinky!)','sweep'],
	done: ['sleep', 'more sleep']
}

app.use(express.static('/Blog_Site'));
app.get('/', function (req, res) {
  res.sendFile( currPath + '/home.html' );
});
app.get('/toDo', function (req, res) {
  res.sendFile( currPath + '/toDo.html');
});
app.get('/js', function (req, res) {
  res.sendFile( currPath + '/toDo.js');
});
app.get('/stylesheet', function (req, res) {
  res.sendFile( currPath + '/stylesheet.css');
});
app.get('/data', function (req, res) {
  res.send(listData);
});
app.get('/blocks', function(request, response){
	var blocks = ['Fixed','Movable','Rotating'];
	response.json(blocks);
});

var port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});