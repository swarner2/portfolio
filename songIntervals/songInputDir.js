app.directive("songInputDir",function(){
  return {
    template:
    `
      <div>
        <h3>Input</h3>
        Key: <input type="text" ng-model="song.key" ng-change=updateScale()> <br>
        Section Name: <input type="text" ng-model="newSectionName"> <br>
        Section Chords: <input type="text" ng-model="newSectionChords"> <br>
        <input type="button" value="Add Section" ng-click=addSection()>
      </div>
    `
  }
})
