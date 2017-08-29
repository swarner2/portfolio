app.component('winner', {
  template: `
  <h5 id='winner' class='{{$ctrl.getWinner()}}'>Winner is {{$ctrl.getWinner()}}</h5>
  <p>Score {{$ctrl.score}}</p>
  `,
  bindings : {
    score : '<'
  },
  controller : winnerCtrl,
})

winnerCtrl.$inject = ['gameService']
function winnerCtrl(gameService){
  this.winner='Tie'
  this.score = gameService.score;
  this.getWinner = function(){
    if (gameService.score.Blue === gameService.score.Red) {
      return 'Tie'
    }
    else if (gameService.score.Blue > gameService.score.Red) {
      return 'Blue'
    }
    else {
      return 'Red'
    }
  }
}
