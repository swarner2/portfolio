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
  let lastPiece = {};

  this.clickedStyle = function(){
    if (this === this.lastClicked) {
      return 'clicked'
    }
  }

  this.clickPiece = function(x,y){
    let piece = this.board[y][x];
    //if it is a clickable piece, not empty board space
    if (piece.player !== 'none') {
      moveService.getMoves(x,y)
      //reset lastMoves
       moveService.resetMoves(lastPiece)
      // //for the first click
      if (angular.equals(lastPiece, {})) {
        lastPiece = piece;
      }
      this.lastClicked.x = x;
      this.lastClicked.y = y;
      piece.clicked = 'clicked';
      //setup lastMoves
      moveService.setupMoves(this.board)
    }
    //if empty board space is clicked
    else {
      // console.log('empty cell clicked.  Last Piece: ', lastPiece);
      moveService.move(lastPiece, x, y);
      moveService.resetMoves(lastPiece);
      this.board[this.lastClicked.y][this.lastClicked.x].clicked = '';
    }
    lastPiece = piece;
  }
}
