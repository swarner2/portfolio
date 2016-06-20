var toDoList = document.getElementById('toDoList');
var doneList = document.getElementById('doneList');
var submit = document.getElementById('submit')
//this gets data on load through an object on the sever
var xmlhttp = new XMLHttpRequest();
var url = "/data";
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var serverData = xmlhttp.responseText;
    var toDoData = JSON.parse(serverData).toDo;
    var doneData = JSON.parse(serverData).done;
    for(var i = 0; i < toDoData.length; i++){
 //     console.log(toDoData[i])
      addItem(toDoData[i], 'toDoList');
    }
    for(var i = 0; i < doneData.length; i++){
//      console.log(doneData[i])
      addItem(doneData[i], 'doneList');
    }    
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
//this list expects that (the this of the clicked on element)
//it will move the element from one list to the other
function changeList(event){
    console.log('hi');
    var that = event.target
  	var list = whereInLists(event.target).list
  	var place = whereInLists(event.target).place
  	if(list.id === 'toDoList'){var otherList = document.getElementById('doneList')}
  	else{var otherList = document.getElementById('toDoList')}
  	otherList.appendChild(list.childNodes[place]);

    console.log(otherList);
}
//whereInLists expects That (that = this) as its argument
//the output will be an object.list (which list the clicked item is in)
//and object.place (first item on the list comes up as 1)
function whereInLists(that){
    var data = {};
    if (that.id === 'toDoListHeader') {
      data.fromHeader = true;
      data.list = document.getElementById('toDoList');
      return data
    }
    if (that.id === 'doneListHeader') {
      data.fromHeader = true;
      data.list = document.getElementById('doneList');
      return data 
    }    
    if (!data.fromHeader) {}{
      var list = document.getElementById(that.parentElement.id);
      data.list = list;
      for(var i = 0; i < list.childNodes.length; i++){
          if(list.childNodes[i] === that){
            data.place = i;
          }
      } 
      return data
    }
}
//this adds a new to do list item to the list
function addItem(x, list){

	var li = document.createElement('li');
	var newTask = document.getElementById('newTask');
	li.className = 'listItem'
  if (list == false || list === 'toDoList'){
	  toDoList.appendChild(li);
  };
  if (list === 'doneList') {
    doneList.appendChild(li);
  }
  //if there is no value let the inner html go through the passed argument
  //this is intended to be coming from the storred data on load
  if (newTask.value == false){li.innerHTML = x}
  else{li.innerHTML = newTask.value;}
	li.onclick = changeList;
	li.draggable = true; 
	li.ondragstart = dragItem;
	li.ondragover = allowDrop;
	li.ondrop = dropItem;
}


submit.onclick = addItem;