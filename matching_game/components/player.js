app.component('player', {
  template: `
    <div class='player {{$ctrl.turn()}} {{$ctrl.team}}'>
      <h2>{{$ctrl.team}} Player</h2>
      <p> Score: {{$ctrl.score[$ctrl.team]}}</p>
    </div>
  `,
  controller: playerCtrl,
  bindings : {
    team : '@',
  }
})

playerCtrl.$inject = ['gameService']
function playerCtrl(gameService){
  this.score = gameService.score
  this.turn = function(){return this.team + gameService.turn + 'turn'}

}
