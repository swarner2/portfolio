app.component('player', {
  template: `
    <div ng-style='$ctrl.style'>
      <h2>{{$ctrl.team}} Player</h2>
      <p> Score: {{$ctrl.score[$ctrl.team]}}</p>
    </div>
  `,
  controller: playerCtrl,
  bindings : {
    team : '@'
  }
})

playerCtrl.$inject = ['gameService']
function playerCtrl(gameService){
  // console.log('team', this.team, 'turn', gameService.turn);
  this.score = gameService.score
  this.style = {}
  if (gameService.turn === this.team) {
    // this.style = {'border': 'solid black 3px'}
    // console.log(gameService.turn);
  }
  else {
    this.style = {'border': '0px'}
  }

}
