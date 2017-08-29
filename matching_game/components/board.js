app.component('board', {
  template :`
    <div id='board'>
      <winner></winner>
      <div ng-repeat='card in $ctrl.shuffledDeck track by $index' class='card {{card.color}} {{card.clicked}}' ng-click='$ctrl.flipCard(card, $index)'>
      <p>{{card.number}}</p>
      </div>
    </div>
    <button ng-click='$ctrl.window()'>New Game</button>
  `,
  controller : cardCtrl
})

cardCtrl.$inject = ['cardService', '$window', 'gameService', 'shuffleService', 'flipCardService']
function cardCtrl(cardService, $window, gameService, shuffleService, flipCardService){
  this.shuffleService = shuffleService;
  this.window = function(){
    $window.location.reload();
  }

  this.shuffledDeck = shuffleService.shuffle()
  this.clicked = flipCardService.clicked;
  this.flipCard = flipCardService.flipCard;
  this.turn = gameService.turn;

}
