var toDoList = document.getElementById('toDoList');
var doneList = document.getElementById('doneList');
var submit = document.getElementById('submit');
var formData = document.getElementById('formData');

//Add the new item and then reset the value of the input
//post the DOM lists up to the server to give the new info
function submission(){
  addItem();
  newTask.value = '';
  sortData('post',clientList());
}
//this list expects that (the this of the clicked on element)
//it will move the element from one list to the other
function changeList(event){
    var that = event.target
  	var list = whereInLists(event.target).list
  	var place = whereInLists(event.target).place
  	if(list.id === 'toDoList'){var otherList = document.getElementById('doneList')}
  	else{var otherList = document.getElementById('toDoList')}
  	otherList.appendChild(list.childNodes[place]);
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
  //sort to needed list if a list is passed as an argument else put it on toDoList
  if (list === 'toDoList'){
	  toDoList.appendChild(li);
  };
  if (list === 'doneList') {
    doneList.appendChild(li);
  }
  if (list == undefined) {
    if(newTask.value === ''){return}
    else{toDoList.appendChild(li);}
  }
  //if there is no value let the inner html go through the passed argument
  //this is intended to be coming from the storred data on load
  if (newTask.value === ''){li.innerHTML = x}
  else{
    li.innerHTML = newTask.value;
    console.log('pulled from input')
  }
  //make it draggable
	li.onclick = changeList;
	li.draggable = true; 
	li.ondragstart = dragItem;
	li.ondragover = allowDrop;
	li.ondrop = dropItem;
}
submit.onclick = submission;