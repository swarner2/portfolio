var express = require('express');
var app = express();
var path = require('path');
var currPath =  path.join(__dirname)
var bodyParser = require('body-parser');
var fs = require('fs')
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./routes.js');
	routes(app);
var listData = require('./listData.js');

app.get('/data', function (req, res) {
	fs.readFile('data.txt', 'utf8', function (err, data) {
	  if (err) throw err;
	  res.send(JSON.parse(data));
	});
});
app.post('/data', function (req, res) {
	listData = req.body;
	res.send(listData)
	fs.writeFile('data.txt', JSON.stringify(listData), function (err) {
		if (err) return console.log(err);
	});
});
app.post('/save', function(req, res){
	listData = req.body;
	fs.writeFile('data.txt', JSON.stringify(listData), function (err) {
	  if (err) return console.log(err);
	});
});

var port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
