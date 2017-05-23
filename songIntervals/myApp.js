const app = angular.module('myApp', [])

.controller('myCtrl', ['$scope', function($scope){
    $scope.getKeynotes = function(key){
      let notes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
      let majorSteps = [2,2,1,2,2,2,1,2,2,1];
    //  let minorSteps = [2,1,2,2,1,1,2]
      const keyNotes = []
      keyNotes.push(
        {
          note: notes[notes.indexOf(key)],
          majorMinor: ''
        }
      )
      for (var i = 0; keyNotes.length < 7; i++) {
        let lastNote = keyNotes[keyNotes.length - 1].note
        let majorMinor = '';
        if (majorSteps[1] + majorSteps[2] === 3) {
          majorMinor = 'm';
        }
        keyNotes.push(
          {
            note: notes[notes.indexOf(lastNote)  + majorSteps.shift()],
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

    $scope.song = {
      key : "B",
      sections :  {
        verse: {
          chords : ['B','E'],
          intervals : ["I", "IV"]
        }
      },
    };
    $scope.song.scale = $scope.getKeynotes($scope.song.key);
    $scope.song.intervals = $scope.getIntervals($scope.song.scale);
    $scope.song.sectionIntervals = function(section){
      return section.map(function(chord){
        return $scope.song.intervals[chord]
      })
    }
    $scope.addSection = function(){
        console.log($scope.newSectionChords.split(' '));
        $scope.song.sections[$scope.newSectionName] = {
          chords:  $scope.newSectionChords.split(' '),
          intervals : $scope.song.sectionIntervals($scope.newSectionChords.split(' '))
        }
        console.log($scope.song.sections);
    }
    $scope.updateScale = function(){
      $scope.song.scale = $scope.getKeynotes($scope.song.key);
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
}])
