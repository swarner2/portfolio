module.exports = function(app){
	var path = require('path');
	//folder structure
	var currPath =  path.join(__dirname) ;
	var scripts = '/javascript'
	var	routes = {
		'/' 			: '/home.html',
		'/toDo' 		: '/toDo.html',
		'/toDoJs' 		: scripts + '/toDo.js',
		'/draggableJs' 	: scripts + '/draggable.js',
		'/stylesheet'	: '/stylesheet.css'
	};
	var makeRoute = function(route, file){
		app.get(route, function (req, res) {
	  		res.sendFile( currPath + file );
		});
	};
	for (var key in routes){
		makeRoute(key,routes[key])
	}
}