app.directive('songSheetDir',function(){
  return {
    template:
    `
    <div>
      <h1>{{song.name}}</h1>
      Key: {{song.key}} <br>
      Scale: {{song.scale.join(", ")}} <br>
      <ul ng-repeat="(section, info) in song.sections">
        <li><strong>{{section}}</strong>: {{info.chords.join(' - ')}} <br>
        {{song.sectionIntervals(info.chords).join(' - ') }}<br>
        </li>
        <input value='add note'> 
      </ul>
    </div>

    `
  }
} )
