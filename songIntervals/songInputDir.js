app.directive("songInputDir",function(){
  return {
    template:
    `
      <div>
        <h3>Input</h3>

        Key: <input type="text" ng-model="song.key" ng-change=updateScale()>
        <input type="Button" value={{song.majorMinor}} ng-click="toggleMajorMinor()">
        <br>
        Section Name: <input type="text" ng-model="newSectionName"> <br>
        Section Chords: <input type="text" ng-model="newSectionChords"> <br>
        <span ng-repeat="chord in song.scale">
          <input type="button" value={{chord}} ng-click="addToNewSectionChords(chord)">
        </span>
        <input type="button" value="Add Section" ng-click="addSection()">
      </div>
    `
  }
})
