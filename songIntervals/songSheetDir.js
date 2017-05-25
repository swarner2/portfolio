app.directive('songSheetDir',function(){
  return {
    template:
    `
    <div>
      <h1 class='title'>{{song.name}}</h1>
      <p class="key"> Key: {{song.key}} </p>
      <ul ng-repeat="(section, info) in song.sections">
        <div class='sectionContainer'>
          <h4 class="sectionTitle"><strong>{{section}}</strong>: </h4>
          <div class='sectionInfoContainer'>
            <p class='sectionChords'>{{info.chords.join(' - ')}} </p>
            <p class='sectionIntervals'>{{song.sectionIntervals(info.chords).join(' - ') }}</p>
          </div>
          <p class='sectionNoteInput'><input value='add note'></p>
        </div>
      </ul>
    </div>

    `
  }
} )
