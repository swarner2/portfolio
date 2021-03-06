app.service('flipCardService', ['gameService',function(gameService){
  this.clicked = [];

  this.turn = gameService.turn
  let changeTurn = function(){
    if (gameService.turn === 'Red') {
      gameService.turn = 'Blue'
    }
    else {
      gameService.turn = 'Red'
    }
  }

  this.flipCard = function(card, index){
    if (this.clicked.length === 2) {
        this.clicked[0].clicked = false;
        this.clicked[1].clicked = false;
        this.clicked = [];
    }
    this.clicked.push(card)
    card.clicked = true;
    if (this.clicked[0] === this.clicked[1]){
      this.clicked.length = 1;
    }
    if (this.clicked.length === 2) {
        if (this.clicked[0].color == this.clicked[1].color  && this.clicked[0].number == this.clicked[1].number) {
          gameService.score[this.turn]++
          this.clicked = []
        }
      changeTurn();
      this.turn = gameService.turn
    }
  }
}])
