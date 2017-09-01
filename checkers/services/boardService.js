app.service('boardService', function(){
  this.makeBoard = function(){
    let board = [];
    let width = 8;
    let height = 8;
    for (var row = 0; row < width; row++) {
      board[row] = [];
      let oddColor;
      let start = row % 2 !== 0 ? 'white' : 'black';
      for (var column = 0; column < width; column++) {
        let square = {};
        square.y = column;
        square.x = row;
        if (column === 0) {
          oddColor = start;
        }
        let evenColor = oddColor === 'white' ? 'black' : 'white'
        square.color = column % 2 === 0 ? evenColor : oddColor;
        console.log(row);
        square.piece = (row < 3 && square.color === 'black') ? 'player2': 'none'
        if (row >= 5 && square.color === 'black') {
          square.piece = 'player1';
        }
        board[row][column] = square
      }
    }
    return board
  }
  this.board = this.makeBoard();
})
