module.exports = function(app){
	var path = require('path');
	//folder structure
	var currPath =  path.join(__dirname) ;
	var scripts = '/javascript'
	var styles = '/styles'
	var	routes = {
		'/' 			: '/home.html',
		'/toDo' 		: '/toDo.html',
		'/toDoJs' 		: scripts + '/toDo.js',
		'/draggableJs' 	: scripts + '/draggable.js',
		'/clientLists'	: scripts + '/clientLists.js',
		'/onLoad'		: scripts + '/onLoad.js',
		'/stylesheet'	: styles + '/stylesheet.css',
		'/responsive' : styles + '/responsive.css'
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
