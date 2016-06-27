var toDoList = document.getElementById('toDoList');
var doneList = document.getElementById('doneList');
var submit = document.getElementById('submit');
var inputField = document.getElementById('newTask');

//Add the new item and then reset the value of the input
//post the DOM lists up to the server to give the new info
function submission(){
  addItem();
  newTask.value = '';
  sortData('post','/data',clientList());
}
function keyPress(event){
    if (event.which === 13) {
      submission();
       console.log('you hit enter')
    }
}
//this list expects that (the this of the clicked on element)
//it will move the element from one list to the other
function changeList(event){
    var that = event.target
    var obj = whereInLists(that);
    var list = document.getElementById(obj.list);
    //if right div is clicked
    if(that.className === "deleteButton" || that.parentElement.id === 'divRight'){
        list.removeChild(list.childNodes[obj.place]);
        sortData('post','/data',clientList());
        return;
    }
  	if(obj.list === 'toDoList'){var otherList = document.getElementById('doneList')}
  	else{var otherList = document.getElementById('toDoList')}
    //console.log(obj)
  	otherList.appendChild(list.childNodes[obj.place]);
    sortData('post','/data',clientList());
}
//whereInLists expects That (that = this) as its argument
//the output will be an object.list (which list the clicked item is in)
//and object.place (first item on the list comes up as 1)
function whereInLists(that){
    var data = {};
    if (that.id === 'toDoListHeader') {
      data.fromHeader = true;
      data.list = 'toDoList';
      return data
    }
    if (that.id === 'doneListHeader') {
      data.fromHeader = true;
      data.list = 'doneList';
      return data
    }
    if (!data.fromHeader){
      var list = findParent(that, 'UL');
      data.list = findParent(that, 'UL').id;
      //reset that to the list element
      that = findParent(that, 'LI');
      for(var i = 0; i < list.childNodes.length; i++){
          if(list.childNodes[i] === that){
            data.place = i;
          }
      }
      return data
    }
}
//used to find the parent list no matter what child is clicked on
//returns the id of the parent list
//must have the event.target passed as that
function findParent(that, tag){
  while(that.tagName !== tag || that.tagName === 'html'){
    that = that.parentElement;
  }
  return that
}
//this adds a new to do list item to the list
function addItem(x, list){
	var li = document.createElement('li');
  var divLeft = document.createElement('div');
  var divRight = document.createElement('div');
  var p = document.createElement('p');
	var newTask = document.getElementById('newTask');
  var button = document.createElement('button');

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
  li.appendChild(divLeft);
  li.appendChild(divRight);
  divLeft.id = 'divLeft';
  divRight.id = 'divRight';
  divLeft.appendChild(p);
  divRight.appendChild(button);
  if (newTask.value === ''){p.innerHTML = x}
  else{
    p.innerHTML = newTask.value;
    console.log('pulled from input')
  }
  //make delete button
  button.innerHTML = 'X';
  button.className = 'deleteButton';
  //make li draggable
	li.onclick = changeList;
	li.draggable = true;
	li.ondragstart = dragItem;
	li.ondragover = allowDrop;
	li.ondrop = dropItem;
//  li.innerHTML = li.innerHTML + deleteButton;
}
submit.onclick = submission;
newTask.onkeypress = keyPress;
