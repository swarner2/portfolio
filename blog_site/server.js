var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//server dependencies
var routes = require('./routes.js')
	routes(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var listData = {
	toDo: ['redo functions interact with server','break up server into modules','install mango and play with','connect server and database with mongoose','deploy with heroku','mlab for mango database online','hook uup heroku with mlab','sass/scss (css preprocessor)','automation (gulp, grunt)','unit testing (jasmine)/(mocha)','fix drag and drop bugs (I know you are there!)','make delete button', 'switch over to atom ide'],
	done: ['connect form to server add bodyparser through npm install --save','set up server','get pages from server calls','drag and drop','get data from server']
}
app.get('/data', function (req, res) {
  res.send(listData);
});
//handle incoming data from form post
app.post('/toDo', function(req, res) {
	listData.toDo.push(req.body.newTask);
	res.sendFile(currPath + '/toDo.html')	
});
var port = 8080;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});