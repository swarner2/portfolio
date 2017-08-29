app.service('shuffleService', ['cardService', 'gameService', function(cardService, gameService){
  this.shuffle = function(){
    let arr = cardService.cards
    let currentIndex = arr.length, tempVal, randIndex
    while (currentIndex !== 0) {
      randIndex = Math.floor(Math.random()  * currentIndex)
      currentIndex--;
      tempVal = arr[currentIndex];
      arr[currentIndex] = arr[randIndex];
      arr[randIndex] = tempVal
    }
    return arr
  }
}])
