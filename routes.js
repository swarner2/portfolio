module.exports = function(app){
	var path = require('path');
	//folder structure
	var currPath =  path.join(__dirname) ;
	var toDo = '/toDo';
	var portfolio = '/framework';
	var songIntervals = '/songIntervals';
	var scripts = '/javascript';
	var styles = '/styles';
	var	routes = {
		'/' 						 : portfolio + '/test.html',
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
			'/toDoImg' : portfolio + '/img/toDo.png',
			'/latin' : portfolio + '/img/latin.jpg',
			'/intervals' : portfolio + '/img/intervals.jpg',
		'/sentenceGen' :  '/sentenceGen/sentenceGen.html',
			'/sentenceGenScript' : '/sentenceGen/sentenceGenScript.js',
			'/sentenceGenStyle' : '/sentenceGen/style.css',
		'/songIntervals' : songIntervals + '/index.html',
			'/myApp'	: songIntervals + "/myApp.js",
			'/songSheetDir': songIntervals + "/songSheetDir.js",
			'/songInputDir': songIntervals + "/songInputDir.js",
	};
	var makeRoute = function(route, file){
		app.get(route, function (req, res) {
	  		res.sendFile( currPath + file );
		});
	};
	for (var key in routes){
		makeRoute(key,routes[key]);
	}
};
