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
  this.lastMoves = {left: '', right: ''};

  this.clickedStyle = function(){
    console.log(this, this.lastClicked);
    if (this === this.lastClicked) {
      return 'clicked'
    }
  }

  this.clickPiece = function(x,y){
    let piece = this.board[x][y]
    let moves = moveService.getMoves(piece.player,x,y);
    //reset lastMoves
    if (this.lastMoves.left === undefined) {
      this.lastMoves.left = '';
    }
    if (this.lastMoves.right === undefined) {
      this.lastMoves.right = '';
    }
    this.lastMoves.left.move = '';
    this.lastMoves.right.move = '';
    //for the first click
    if (this.lastClicked.x != undefined) {
      this.board[this.lastClicked.x][this.lastClicked.y].clicked = '';
    }
    this.lastClicked.x = x;
    this.lastClicked.y = y;
    piece.clicked = 'clicked';

    //setup lastMoves
    this.lastMoves.left = this.board[moves.y][moves.left]
    this.lastMoves.right = this.board[moves.y][moves.right]
    if (moves.left >= 0) {
      this.lastMoves.left.move = 'move';
    }
    else {
    }
    if (moves.right < this.board[0].length) {
      this.lastMoves.right.move = 'move';

    }

  }
}
