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
//	console.log(listData)
 	res.send(listData);
});

app.post('/data', function (req, res) {
	listData = req.body;
	res.send(listData)
});

app.post('/close', function(req, res){
	listData = req.body;
	fs.writeFile('data.txt', JSON.stringify(listData), function (err) {
	  if (err) return console.log(err);
	  console.log('listData > data.txt');
	});

});

var port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
