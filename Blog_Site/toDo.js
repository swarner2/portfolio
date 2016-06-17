var toDoList = document.getElementById('toDoList');
var doneList = document.getElementById('doneList');
var submit = document.getElementById('submit')

/*  JSON Example
//  from:  http://www.w3schools.com/json/json_http.asp
var xmlhttp = new XMLHttpRequest();
var url = "/data";
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var serverdata = JSON.parse(xmlhttp.responseText);
    var data = "";
    console.log(serverdata);
      for(var i = 0; i < serverdata.length; i++){
          data += serverdata[i].display + " , " + serverdata[i].url;
      }
    console.log('data: ' + data)
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
*/



//draggedItem and itemDroppedOn are used to transfer data between the drag and drop
var draggedItem = {}
var itemDroppedOn = {}
//the data is actually being transfered through the draggedItem object getting its 
//parent list and its position in that list
function dragItem(event){
  draggedItem = whereInLists(event.target);
	event.dataTransfer.setData('text/html', event.target);
	event.dataTransfer.dropEffect = 'move';
}
//dropItem compaires the draggedItem and itemDroppedOn positions to decide which is
//placed infront of which
function dropItem(event) {
  event.preventDefault();
 	itemDroppedOn = whereInLists(event.target);
  var destinationList = document.getElementById(itemDroppedOn.list.id)
  var dragged = draggedItem.list.childNodes[draggedItem.place];
  var droppedOn = itemDroppedOn.list.childNodes[itemDroppedOn.place];

  var data = event.dataTransfer.getData("text/html"); 
  //makes sure that if it is a header it is appended to the list 
  function alert(condition){
    console.log("-----------------------------")
    console.log("dragged place    : " +draggedItem.place);
    console.log("droppedOn place  : " + itemDroppedOn.place);
    console.log("dragged list     : " +draggedItem.list.id);
    console.log("droppedOn list   : " + itemDroppedOn.list.id);    
    console.log("dragged list.len : " +draggedItem.list.childNodes.length);
    console.log("droppedOn listlen: " + itemDroppedOn.list.childNodes.length);
    console.log("condition number : " + condition);
  }  
  if (itemDroppedOn.fromHeader) {
    alert('Dropped On Header')
    itemDroppedOn.list.appendChild(dragged);
  }
  //if moving first position of 1 list to the other
  else if (itemDroppedOn.place === draggedItem.place) {
    alert('From 1st place to 1st place')
    destinationList.insertBefore(dragged, droppedOn);             
  }
  //if you are trying to drop it on the last item of a list
  //it appends the dragged item to the end of the list
  else if (((itemDroppedOn.list.childNodes.length - 1) === itemDroppedOn.place)&& itemDroppedOn.place !== 1){
    alert('Dropped on the Last')
    destinationList.appendChild(dragged);
  }
  //to control moving down
 	else if(itemDroppedOn.place > draggedItem.place){
    if (itemDroppedOn.list.id !== draggedItem.list.id) {
      alert('moving down in different list')
      destinationList.insertBefore(dragged, droppedOn);
    }
    else{
    alert('moving down same list')
    destinationList.insertBefore(droppedOn,dragged);      
    }
  }
  //to control moving up
  else if(itemDroppedOn.place < draggedItem.place){
    alert('moving up')
    destinationList.insertBefore(dragged,droppedOn);
  }

}
function allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}
//this list expects that (the this of the clicked on element)
//it will move the element from one list to the other
function changeList(event){
    var that = event.target
  	var list = whereInLists(event.target).list
  	var place = whereInLists(event.target).place
  	if(list.id === 'toDoList'){var otherList = document.getElementById('doneList')}
  	else{var otherList = document.getElementById('toDoList')}
  	otherList.appendChild(list.childNodes[place])
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
function addItem(x){

	var li = document.createElement('li');
	var newTask = document.getElementById('newTask');
	li.className = 'listItem'
	toDoList.appendChild(li);
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

var xmlhttp = new XMLHttpRequest();
var url = "/data";
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var serverData = xmlhttp.responseText
    var cleanData = serverData.replace('[','')
    cleanData = cleanData.replace(']','')
    cleanData = cleanData.split(',');
    for(var i = 0; i < cleanData.length; i++){
      console.log(cleanData[i])
      addItem(cleanData[i]);
    }
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

submit.onclick = addItem;