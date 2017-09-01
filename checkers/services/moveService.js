app.service('moveService', function(){
  this.getMoves = function(player, y,x){
    moves = {}
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
    console.log(moves);
    return moves;
  }
})
