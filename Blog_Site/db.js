module.exports = function(app){
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));


  db.once('open', function() {
    console.log("~~~~~~we're connected to mangoDB!~~~~~~~");
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

  });
}
