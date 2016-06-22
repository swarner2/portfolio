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

//var listData = {"toDoList":["asdf"],"doneList":["saved code"]}

/*  tried to reset data.txt to a default value
var resetJSON = function(data){
	var baseData = {"toDoList":[],"doneList":[]};
	if (data === "{}" || data === undefined) {
		data = baseData;
		console.log('data is undefined')
		console.log(data)
	}
	if (data.toDoList === undefined) {
		data.toDoList = [];
		console.log('toDoList undefined')
		console.log(data)
	}
	if (data.doneList === undefined) {
		data.doneList = [];
		console.log(data.doneList)
		console.log('doneList undefined')
		console.log(data)
	}
	fs.writeFile('data.txt', JSON.stringify(data));
};
*/


app.get('/data', function (req, res) {
//	console.log(listData)
 	res.send(listData);
});

app.post('/data', function (req, res) {
	listData = req.body;
	res.send(listData)
});

var port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});