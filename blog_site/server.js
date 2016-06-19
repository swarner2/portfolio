
var express = require('express');

var app = express();

var path = require('path');

var currPath =  path.join(__dirname);
var qs = require('querystring');

var listData = {
	toDo: ['connect form to server add bodyparser through npm install --save','break up server into modules','install mango and play with','connect server and database with mongoose','deploy with heroku','mlab for mango database online','hook uup heroku with mlab','sass/scss (css preprocessor)','automation (gulp, grunt)','unit testing (jasmine)/(mocha)','fix drag and drop bugs (I know you are there!)','make delete button', 'switch over to atom ide'],
	done: [,'set up server','get pages from server calls','drag and drop','get data from server']
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

app.post('/action', function(req, res) {

  res.send('You sent the name "' + req.body.newTask + '".');
});

var port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});