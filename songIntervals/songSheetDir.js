app.directive('songSheetDir',function(){
  return {
    template:
    `
    <div>
      Name: <input type="text" ng-model="song.name" ng-change="changeTitle()"> <br>
      Key: {{song.key}} <br>
      Scale: {{song.scale.join(", ")}} <br>
      <ul ng-repeat="(section, info) in song.sections">
        <li>{{section}}: {{info.chords.join(' - ')}} <br>
        Intervals: {{song.sectionIntervals(info.chords).join(' - ') }}<br>
        </li>
      </ul>
    </div>

    `
  }
} )
