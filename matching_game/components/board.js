app.component('board', {
  template :`
    <div id='board'>
      <h4>Board</h4>
      <h5 id='turn'>Players Turn {{$ctrl.turn}}</h5>
      <h5 id='winner' ng-style='this.winnerStyle'>Winner is {{$ctrl.winner}}</h5>
      <div ng-repeat='card in $ctrl.shuffledDeck track by $index' class='card {{card.color}} {{card.clicked}}' ng-click='$ctrl.flipCard(card, $index)'>
      <p>{{card.number}}</p>
      </div>
    </div>
    <button ng-click='$ctrl.window()'>New Game</button>
  `,
  controller : cardCtrl
})

cardCtrl.$inject = ['cardService', '$window', 'gameService']
function cardCtrl(cardService, $window, gameService){
  this.window = function(){
    $window.location.reload();
  }
  this.deck = cardService.cards

  this.drawCard = function(){
    cardId = Math.floor(Math.random() * this.deck.length)
    //I know this is a bad idea for speed but since the game is so small I am starting with this
    //and would fix it at the end if there is enough time
    while(this.deck[cardId].used >= 1) {
      cardId = Math.floor(Math.random() * this.deck.length)
    }
    this.deck[cardId].used++
    return this.deck[cardId]
  }

  this.shuffle = function(){
    let shuffled = []
    for (var i = 0; i < this.deck.length; i++) {
      shuffled.push(this.drawCard())
    }
    return shuffled
  }

  this.shuffledDeck = this.shuffle()

  this.clicked = [];

  this.turn = gameService.turn
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

  this.flipCard = function(card, index){
    if (this.clicked.length === 2) {
      if (this.clicked[0].color == this.clicked[1].color  && this.clicked[0].number == this.clicked[1].number) {
        console.log('point given');
        gameService.score[this.turn]++
        this.getWinner()
        this.clicked = []
      }
      else {
        this.clicked[0].clicked = false;
        this.clicked[1].clicked = false;
        this.clicked = [];
        if (gameService.turn === 'Red') {
          gameService.turn = 'Blue'
        }
        else {
          gameService.turn = 'Red'
        }
        this.turn = gameService.turn
        console.log('turn: ' + gameService.turn);
      }
    }
    this.clicked.push(card)
    card.clicked = true;
  }
}
