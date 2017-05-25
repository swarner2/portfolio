app.directive("songInputDir",function(){
  return {
    template:
    `
      <div id="inputContainer">
        <h3>Input</h3>
        <span class="inputText">Name: </span> <input type="text" ng-model="song.name" ng-change="changeTitle()"> <br>
      <span class="inputText">  Key:</span>  <input type="text" ng-model="song.key" ng-change=updateScale()>
        <input type="Button" value={{song.majorMinor}} ng-click="toggleMajorMinor()">
        <br>
        <span ng-repeat="note in notes">
          <input type="button" value={{note}} ng-click="song.key = note; updateScale()">
        </span> <br>
      <span class="inputText">  Section Name: </span> <input type="text" ng-model="newSectionName"> <br>
        <span ng-repeat="sectionType in sectionTypes">
          <input type="button" value={{sectionType}} ng-click="addToNewSectionName(sectionType)">
        </span> <br>
      <span class="inputText">  Section Chords:</span>  <input type="text" ng-model="newSectionChords"> <br>
        <span ng-repeat="chord in song.scale">
          <input type="button" value={{chord}} ng-click="addToNewSectionChords(chord)">
        </span>
        <input type="button" value="Add Section" ng-click="addSection()">
      </div>
    `
  }
})
