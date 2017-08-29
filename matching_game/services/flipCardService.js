app.service('flipCardService', ['gameService',function(gameService){
  this.clicked = [];

  this.turn = gameService.turn

  this.flipCard = function(card, index){
    if (this.clicked.length === 2) {
      if (this.clicked[0].color == this.clicked[1].color  && this.clicked[0].number == this.clicked[1].number) {
        console.log('point given');
        gameService.score[this.turn]++
        // this.getWinner()
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
}])
