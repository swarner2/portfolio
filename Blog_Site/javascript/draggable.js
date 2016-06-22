//draggedItem and itemDroppedOn are used to transfer data between the drag and drop
var draggedItem = {}
var itemDroppedOn = {}
//the data is actually being transfered through the draggedItem object getting its
//parent list and its position in that list
function dragItem(event){
  draggedItem = whereInLists(event.target);
  draggedItem.list = document.getElementById(draggedItem.list);
	event.dataTransfer.setData('text/html', event.target);
	event.dataTransfer.dropEffect = 'move';
}
//dropItem compares the draggedItem and itemDroppedOn positions to decide which is
//placed in front of which
function dropItem(event) {
  event.preventDefault();
 	itemDroppedOn = whereInLists(event.target);
  itemDroppedOn.list = document.getElementById(itemDroppedOn.list);
  var destinationList = document.getElementById(itemDroppedOn.list.id)
  var dragged = draggedItem.list.childNodes[draggedItem.place];
  var droppedOn = itemDroppedOn.list.childNodes[itemDroppedOn.place];
  var data = event.dataTransfer.getData("text/html");
  //makes sure that if it is a header it is appended to the list
  function alert(condition){
 //   console.log("-----------------------------")
 //   console.log("dragged place    : " +draggedItem.place);
 //   console.log("droppedOn place  : " + itemDroppedOn.place);
 //   console.log("dragged list     : " +draggedItem.list.id);
 //   console.log("droppedOn list   : " + itemDroppedOn.list.id);
 //   console.log("dragged list.len : " +draggedItem.list.childNodes.length);
 //   console.log("droppedOn listlen: " + itemDroppedOn.list.childNodes.length);
 //   console.log("condition number : " + condition);
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
