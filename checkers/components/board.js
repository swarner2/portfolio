app.component('board', {
  template: `
    <h1>board</h1>
    <div class='board'>
      <div ng-repeat= "row in $ctrl.board" class = 'row'>
        <div ng-repeat= "square in row">
          <div class= "square {{square.color}} {{square.clicked}} {{'piece' + square.piece}}" ng-click="$ctrl.clickPiece(square.x, square.y)"></div>
        </div>
      </div>
    </div>
  `,
  controller: boardCtrl
})

boardCtrl.$inject = ['boardService']
function boardCtrl(boardService){
  this.board = boardService.board;
  this.lastClicked = {}

  this.clickedStyle = function(){
    console.log(this, this.lastClicked);
    if (this === this.lastClicked) {
      return 'clicked'
    }
  }

  this.clickPiece = function(x,y){
    console.log(x,y);
    if (this.lastClicked.x != undefined) {
      this.board[this.lastClicked.x][this.lastClicked.y].clicked = '';
    }
    this.lastClicked.x = x;
    this.lastClicked.y = y;
    this.board[x][y].clicked = 'clicked';
    console.log(this.board[x][y]);
  }
}
