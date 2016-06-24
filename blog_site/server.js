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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	var schema = new mongoose.Schema({name: String, tasks: [] });
	var List = mongoose.model('List', schema);

//if there are no lists makes the default toDo and done lists
	List.find({}, function(err, lists){
		if(err) throw err;
		if (lists.length === 0) {

			var toDo = new List({ listName:"toDo", tasks:['click to move to the finished list!'] });
			var done = new List({ listName:"done", tasks:['click the X to delete me!'] });
			var saveList = function(listName){
				listName.save(function(err){ if(err) throw err;
					console.log(listName + " : saved!")
				});
			}
			saveList(toDo);
			saveList(done);
		}
		console.log(lists);
	});

  console.log("we're connected to mangoDB!");
});

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
