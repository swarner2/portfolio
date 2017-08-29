app.component('winner', {
  template: `
  <h5 id='winner' class='{{$ctrl.getWinner()}}'>Winner is {{$ctrl.getWinner()}}</h5>
  `,
  bindings : {
    score : '<'
  },
  controller : winnerCtrl,
})

winnerCtrl.$inject = ['gameService', 'cardService']
function winnerCtrl(gameService, cardService){
  this.winner='Tie'
  this.score = gameService.score;
  this.getWinner = function(){
    if ((gameService.score.Blue + gameService.score.Red) * 2 === cardService.cards.length) {
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
    else {
      return 'gameNotOver'
    }
  }
}
