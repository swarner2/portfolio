app.directive('songSheetDir',function(){
  return {
    template:
    `
    <div>
      name: {{song.name}} <br>
      key: {{song.key}} <br>
      scale notes: {{song.scale.join(", ")}} <br>
      <ul ng-repeat="(section, info) in song.sections">
        <li>{{section}}: {{info.chords.join(' ')}} <br>
        intervals: {{song.sectionIntervals(info.chords).join(' - ') }}<br>
        </li>
      </ul>
    </div>

    `
  }
} )
