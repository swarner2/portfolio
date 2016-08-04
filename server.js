var express = require('express');
var app = express();
var path = require('path');
var currPath =  path.join(__dirname);
var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./routes.js');  routes(app);
const MongoClient = require('mongodb').MongoClient
var listData = {};
var db;

MongoClient.connect("mongodb://admin:the1time@ds031792.mlab.com:31792/todo", function (err, database) {
  if (err) return console.log(err);
	var port = process.env.PORT || 8080;

  db = database;
  app.listen(port, function (){
    console.log('listening on 8080');
  });
});
app.get('/data', function (req, res) {
	db.collection('lists').find().toArray(function(err, results) {
	listData = results;
  res.send(results);
});
});
app.post('/data', function (req, res) {
	listData = req.body;
	res.send(listData);
	db.collection('lists').update({_id:"577297795263328017d8c400"},req.body, function(err, result){
		if (err) return console.log(err);
	});
});
app.post('/save', function(req, res){
	db.collection('lists').update({_id:"577297795263328017d8c400"},req.body, function(err, result){
		if (err) return console.log(err);
	});
});
