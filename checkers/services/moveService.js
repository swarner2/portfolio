app.service('moveService', ['boardService',function(boardService){

  this.board = boardService.board
  let moves = {};
  let lastMoves = {left: '', right: ''};

  this.getMoves = function(x,y, player){
    if (player === undefined) {
      player = this.board[y][x].player;
      moves.player = player;
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
    }
    this.checkJumps(player, moves)
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

  this.move = function(activePiece, x,y){
    // console.log(activePiece,x,y);
    if (activePiece.clicked === 'clicked') {
      this.board[y][x].player = activePiece.player;
      activePiece.player = 'none';
    }
  }

  this.checkJumps = function (player, moves){
    let opponent = player === 'player1' ? 'player2' : 'player1';
    let left = this.board[moves.y][moves.left];
    let right = this.board[moves.y][moves.right];
    if (left) {
      if (left.player === opponent){
        console.log('left is opponent: ', opponent, 'left: ', left);
        // this.getMoves(left.x, left.y, player)
      }
    }
    console.log(right);
    if (right) {
      if (right.player === opponent) {
        console.log('right is opponent: ', opponent, 'right: ', right);
        // this.getMoves(right.x, left.y, player)
      }
    }
  }

  this.setupMoves = function(board){
    lastMoves.left = board[moves.y][moves.left]
    lastMoves.right = board[moves.y][moves.right]
    //stop board edge at left
    if (moves.left >= 0) {
      //if the square being moved to does not have a piece on it
      if (lastMoves.left.player === 'none') {
        lastMoves.left.move = 'move';
      }
    }
    //stop board edge at right
    if (moves.right < board[0].length) {
      //if the square being moved to does not have a piece on it
      if (lastMoves.right.player === 'none'){
        lastMoves.right.move = 'move';
      }
    }
  }
}])
