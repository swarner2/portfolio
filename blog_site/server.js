var express = require('express');
var app = express();
var path = require('path');
var currPath =  path.join(__dirname)
var bodyParser = require('body-parser');
var fs = require('fs')
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./routes.js');  routes(app);
const MongoClient = require('mongodb').MongoClient
var database = require('./db.js');	database(app);
var listData = require('./listData.js');

var db

MongoClient.connect("mongodb://admin:the1time@ds031792.mlab.com:31792/todo", function (err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(8080, function (){
    console.log('listening on 8080')
  });
});

app.get('/data', function (req, res) {
	db.collection('lists').find().toArray(function(err, results) {
	listData = results;
  res.send(results)
  // send HTML file populated with quotes here
	})
//	var data = db.collection('lists').find({_id:"577297795263328017d8c400"}).toArray(function(err, results) {console.log(results)});
//	console.log(db.collection('lists').find({_id:"577297795263328017d8c400"}));
//	res.send(data);
//	fs.readFile('data.txt', 'utf8', function (err, data) {
//	  if (err) throw err;
//	  res.send(JSON.parse(data));
//	});
});
app.post('/data', function (req, res) {
	listData = req.body;
	res.send(listData)
	db.collection('lists').update({_id:"577297795263328017d8c400"},req.body, function(err, result){
		if (err) return console.log(err)
		console.log(req.body)
		console.log('database updated................');
	})
});


app.post('/save', function(req, res){
	db.collection('lists').update({_id:"577297795263328017d8c400"},req.body, function(err, result){
		if (err) return console.log(err)
		console.log('database updated................');
	})
})
/*
app.post('/save', function(req, res){
	listData = req.body;
	fs.writeFile('data.txt', JSON.stringify(listData), function (err) {
	  if (err) return console.log(err);
	});
});
*/
