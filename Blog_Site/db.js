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
        console.log('making new lists................................................................')

  			var saveList = function(listName, tasksList){
            var list = new List({ "name": listName, "tasks": tasksLists});
  			    list.save(function(err){ if(err) throw err;
  				  console.log(listName + " : saved!");
  				});
  			}
  			saveList("toDo", ["click to move!!!!"]);
  			saveList("done", ["X to delete ---->"]);
  		}
      console.log(lists)
  	})
    //updates the specified list with the specified new tasks
    function update(listName, tasksList){
      console.log("Updating " + listName + " .................................................................")
      List.findOneAndUpdate({ name: listName }, { tasks: tasksList }, function(err, list) {
        if (err) throw err;
        // we have the updated user returned to us
        console.log(list);
      });
    };
    update("toDo", ["changed to do list", 2])
  });
}
