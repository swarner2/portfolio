app.service('moveService', ['boardService',function(boardService){

  this.board = boardService.board
  let moves = {};
  let lastMoves = {left: '', right: ''};

  this.getMoves = function(x,y){
    let player = this.board[y][x].player
    if (player === 'player2') {
      moves.y = y + 1
      moves.left = x - 1
      moves.right = x + 1
    }
    if (player === 'player1') {
      moves.y = y - 1
      moves.left = x - 1
      moves.right = x + 1
    }
    return moves;
  }

  this.resetMoves = function(){
    if (lastMoves.left === undefined) {
      lastMoves.left = '';
    }
    if (lastMoves.right === undefined) {
      lastMoves.right = '';
    }
    lastMoves.left.move = '';
    lastMoves.right.move = '';
  }

  this.setupMoves = function( board){
    lastMoves.left = board[moves.y][moves.left]
    lastMoves.right = board[moves.y][moves.right]
    if (moves.left >= 0) {
      lastMoves.left.move = 'move';
    }
    if (moves.right < board[0].length) {
      lastMoves.right.move = 'move';
    }
  }
}])
