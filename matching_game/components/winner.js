app.component('winner', {
  template: `
  <h5 id='winner' ng-style='this.winnerStyle'>Winner is {{$ctrl.winner}}</h5>
  `,
  controller : winnerCtrl,
})

winnerCtrl.$inject = []
function winnerCtrl(){
  this.winner='Tie'
  this.getWinner = function(){
    if (gameService.score.Blue === gameService.score.Red) {
      this.winner = 'Tie'
      this.winnerStyle = {color: 'black'}
    }
    else if (gameService.score.Blue > gameService.score.Red) {
      this.winner = 'Blue'
      this.winnerStyle = {color:'blue'}
    }
    else {
      this.winner = 'Red'
      this.winnerStyle = {color: 'red'}
    }
  }
}
