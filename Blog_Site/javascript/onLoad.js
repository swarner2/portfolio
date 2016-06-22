$(document).ready(function() {sortData('get');});

function streamData() {
    setInterval(function(){ sortData(); }, 3000);
}
//streamData();

var postData = function(){
  $.post('/data', clientList(), function(data,status){
    console.log(data);
    $("#toDoList").empty();
    $("#doneList").empty();
    for(var i = 0; i < data.toDoList.length; i++){
//      console.log(data.toDoList[i])
      addItem(data.toDoList[i], 'toDoList');
    }
    for(var i = 0; i < data.doneList.length; i++){
//      console.log(data.doneList[i])
      addItem(data.doneList[i], 'doneList');
    }  
    return;   
  });
}  

var sortData = function(action, upload){
  $[action]('/data',upload, function(data,status){
      //console.log(data.toDoList);
      $("#toDoList").empty();
      $("#doneList").empty();
      if (data.toDoList !== undefined) {
        console.log('toDoList: not undefined')
        for(var i = 0; i < data.toDoList.length; i++){
          addItem(data.toDoList[i], 'toDoList');
      }
      }
      if (data.doneList !== undefined){
        console.log('doneList: not undefined')
        for(var i = 0; i < data.doneList.length; i++){
          addItem(data.doneList[i], 'doneList');
        }
      }  
      return;   
  })
}

