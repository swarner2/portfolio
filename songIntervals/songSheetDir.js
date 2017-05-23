app.directive('songSheetDir',function(){
  return {
    template:
    `
    <div>
      name: <input type="text" ng-model="song.name" ng-change="changeTitle()" <br>
      key: {{song.key}} <br>
      scale notes: {{song.scale.join(", ")}} <br>
      <ul ng-repeat="(section, info) in song.sections">
        <li>{{section}}: {{info.chords.join(' - ')}} <br>
        intervals: {{song.sectionIntervals(info.chords).join(' - ') }}<br>
        </li>
      </ul>
    </div>

    `
  }
} )
