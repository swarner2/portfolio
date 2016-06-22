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
    var obj = whereInLists(that);
    var list = document.getElementById(obj.list);
    console.log(obj);
  	if(obj.list === 'toDoList'){var otherList = document.getElementById('doneList')}
  	else{var otherList = document.getElementById('toDoList')}
  	otherList.appendChild(list.childNodes[obj.place]);
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
    if (!data.fromHeader){
      var list = document.getElementById(findListParent(that));
//      console.log('whereInLists says that findListParent says : ');
//      console.log(list)
      data.list = findListParent(that);
//      console.log(data);
      //reset that to the list element
      if (that.tagName === 'DIV') {
        var li = that.parentElement;
      }
      for(var i = 0; i < list.childNodes.length; i++){
          if(list.childNodes[i] === li){
            data.place = i;
          }
      }
      return data
    }
}
//used to find the parent list no matter what child is clicked on
//returns the id of the parent list
//must have the event.target passed as that
function findListParent(that){
  var result;
  function goUpOne(that){
    var parent = that.parentElement
    if (parent.id !== 'toDoList' && parent.id !== 'doneList'){
      return goUpOne(parent);
    }
    else if (parent.id === 'toDoList' || parent.id === 'doneList'){
      return parent.id;
    }
  };
  return goUpOne(that);
}
//this adds a new to do list item to the list
function addItem(x, list){
	var li = document.createElement('li');
  var div = document.createElement('div')
	var newTask = document.getElementById('newTask');
  var deleteButton = "<button type ='submit' name='deleteButton' id='deleteButton'>X</button>"

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
  li.appendChild(div)
  if (newTask.value === ''){div.innerHTML = x}
  else{
    div.innerHTML = newTask.value;
    console.log('pulled from input')
  }
  //make it draggable
	li.onclick = changeList;
	li.draggable = true;
	li.ondragstart = dragItem;
	li.ondragover = allowDrop;
	li.ondrop = dropItem;
//  li.innerHTML = li.innerHTML + deleteButton;
}
submit.onclick = submission;
