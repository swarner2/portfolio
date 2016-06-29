module.exports = function(app){
	var path = require('path');
	//folder structure
	var currPath =  path.join(__dirname) ;
	var toDo = '/toDo'
	var portfolio = '/portfolio/framework'
	var scripts = '/javascript'
	var styles = '/styles'
	var	routes = {
		'/' 						 : '/portfolio/framework/test.html',
		'/toDo' 		  	 : toDo + '/toDo.html',
		'/toDoJs' 			 : toDo + scripts + '/toDo.js',
		'/draggableJs'	 : toDo + scripts + '/draggable.js',
		'/clientLists'	 : toDo + scripts + '/clientLists.js',
		'/onLoad'			 	 : toDo + scripts + '/onLoad.js',
		'/stylesheet'		 : toDo + styles + '/stylesheet.css',
		'/responsive' 	 : toDo + styles + '/responsive.css',
		'/portfolio'		 : portfolio + '/test.html',
		'/port/css/main' : portfolio + '/css/main.css',
		'/portfolio-background' : portfolio +'/img/dark-website-backgrounds-6.jpg',
		'/forest'	: portfolio + '/img/forest.jpg',
		'/toDoImg' : portfolio + '/img/toDoImg.png',
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
