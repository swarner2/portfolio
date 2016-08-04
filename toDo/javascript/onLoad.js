$(document).ready(function() {sortData('get','/data');});

function streamData() {
    setInterval(function(){ sortData(); }, 3000);
}
//streamData();
//When the window closes send data to the server to be saved
$(window).on("beforeunload", function() {
    sortData('post','/save',clientList());
});
//sortData requires the post or get as the first
//the desired path in the second
//if you want to upload information use the third
var sortData = function(action, path, upload){
  $[action](path,upload, function(data,status){
      //console.log(data)
      //this is used to parse the way the server handles the document
      if(data[0] !== undefined){data = data[0];}
      $("#toDoList").empty();
      $("#doneList").empty();
      if (data.toDoList !== undefined) {
        console.log('toDoList: not undefined');
        for(var i = 0; i < data.toDoList.length; i++){
          addItem(data.toDoList[i], 'toDoList');
      }
      }
      if (data.doneList !== undefined){
        console.log('doneList: not undefined');
        for(var i = 0; i < data.doneList.length; i++){
          addItem(data.doneList[i], 'doneList');
        }
      }
      return;
  });
};
