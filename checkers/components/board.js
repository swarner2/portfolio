app.component('board', {
  template: `
    <div class='board'>
      <div ng-repeat= "row in $ctrl.board" class = 'row'>
        <div ng-repeat= "square in row">
          <div class= "square {{square.color}} {{square.clicked}} {{square.move}} {{'piece' + square.player}}" ng-click="$ctrl.clickPiece(square.x, square.y)"></div>
        </div>
      </div>
    </div>
  `,
  controller: boardCtrl
})

boardCtrl.$inject = ['boardService', 'moveService']
function boardCtrl(boardService, moveService){
  this.board = boardService.board;
  this.lastClicked = {};

  this.clickedStyle = function(){
    if (this === this.lastClicked) {
      return 'clicked'
    }
  }

  this.clickPiece = function(x,y){
    let piece = this.board[y][x]
    console.log(piece)
    if (piece.player !== 'none') {
      moveService.getMoves(x,y)
      //reset lastMoves
      moveService.resetMoves()
      //for the first click
      if (this.lastClicked.x != undefined) {
        this.board[this.lastClicked.y][this.lastClicked.x].clicked = '';
      }
      this.lastClicked.x = x;
      this.lastClicked.y = y;
      piece.clicked = 'clicked';
      //setup lastMoves
      moveService.setupMoves(this.board)
    }
    else {
      moveService.resetMoves();
      this.board[this.lastClicked.y][this.lastClicked.x].clicked = '';
    }
  }
}
