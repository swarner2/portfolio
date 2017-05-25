const app = angular.module('myApp', [])

.controller('myCtrl', ['$scope', function($scope){
    $scope.sectionTypes=['Verse','Chorus','Bridge','Instrumental', 'Tag', 'Pre-Chorus'];
    $scope.notes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
    $scope.song = {
      key : "C",
      name : 'New Song',
      majorMinor: 'major',
      sections :  {
        Verse: {
          chords : ['C','G'],
          intervals : ["I", "IV"]
        }
      },
    };
    $scope.changeTitle = function (){
        window.document.title = $scope.song.name
    }
    $scope.getKeyNotes = function(key){
      key = key.toUpperCase();
      let notes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
      let majorSteps = [2,2,1,2,2,2,1,2,2,1];
      let minorSteps = [2,1,2,2,1,2,2,2,1,2]
      let steps = []
      let keyMajorMinor = ''
      if ($scope.song.majorMinor === 'major') {
         steps = majorSteps;
      }
      else {
         steps = minorSteps;
         keyMajorMinor = 'm'
         console.log('minor: ',steps);
      }
      const keyNotes = []

      keyNotes.push(
        {
          note: notes[notes.indexOf(key)],
          majorMinor: keyMajorMinor
        }
      )
      for (var i = 0; keyNotes.length < 7; i++) {
        let lastNote = keyNotes[keyNotes.length - 1].note
        let majorMinor = '';
        if (steps[1] + steps[2] === 3) {
          majorMinor = 'm';
        }
        keyNotes.push(
          {
            note: notes[notes.indexOf(lastNote)  + steps.shift()],
            majorMinor: majorMinor
          }
        )
      }

      return keyNotes.map(function(chord){
        return chord.note + chord.majorMinor
      });
    }
    $scope.getIntervals = function(scale){
      let intervalSteps = ['I','IIm',"IIIm",'IV','V','VIm','VIIm']
      let intervalMap = {};
      scale.forEach(function (chord, index){
          intervalMap[chord] = intervalSteps[index];
      })
      return intervalMap;
    }


    $scope.song.scale = $scope.getKeyNotes($scope.song.key);
    $scope.song.intervals = $scope.getIntervals($scope.song.scale);
    $scope.song.sectionIntervals = function(section){
      return section.map(function(chord){
        return $scope.song.intervals[chord]
      })
    }
    $scope.addSection = function(){
      console.log();
        $scope.song.sections[$scope.newSectionName] = {
          chords:  $scope.newSectionChords.replace(" ",'').split(' '),
          intervals : $scope.song.sectionIntervals($scope.newSectionChords.replace(" ",'').split(' '))
        }
        $scope.newSectionChords = '';
    }
    $scope.updateScale = function(){
      $scope.song.scale = $scope.getKeyNotes($scope.song.key);
      let newIntervals = $scope.getIntervals($scope.song.scale);
      for(section in $scope.song.sections){
        let songSection = $scope.song.sections[section]
        songSection.chords = []
        songSection.intervals.forEach(function(interval){
          for(chord in newIntervals){
            if (newIntervals[chord] === interval) {
              songSection.chords.push(chord);
            }
          }
        })
        $scope.song.intervals = $scope.getIntervals($scope.song.scale);
      }
    }
    $scope.addToNewSectionChords = function(chord){
      if ($scope.newSectionChords === undefined) {
        $scope.newSectionChords = '';
      }
      $scope.newSectionChords = $scope.newSectionChords + " " + chord;
    }
    $scope.toggleMajorMinor = function(){
      if ($scope.song.majorMinor === 'major') {
        $scope.song.majorMinor = 'minor'
      }
      else {
        $scope.song.majorMinor = 'major'
      }
      $scope.song.scale = $scope.getKeyNotes($scope.song.key);
      $scope.song.intervals = $scope.getIntervals($scope.song.scale);
    }
    $scope.addToNewSectionName = function(sectionType){
      $scope.newSectionName = sectionType;
    }
}])
