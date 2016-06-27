var clientList = function(){
	//takes the ID of a html list element
	//outputs the text nodes of that list in the order they appear
	var parseList = function(listId){
		var list = document.getElementById(listId);
		var listData = [];
	  	for(var i = 0; i < list.childNodes.length; i++){
	    	var text = list.childNodes[i].innerText;
	    	if (list.childNodes[i].innerText === undefined) {}
	    	else{listData.push(text.replace(/\nX$/,''));}	
	    }
		return listData
	}
	var data = {
		toDoList : parseList('toDoList'),
		doneList : parseList('doneList'),
	};
	return data
};
