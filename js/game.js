var Furry = require('./furry.js');
var Coin = require('./coin.js');

var Game = function(){
  this.board = document.querySelectorAll('#board div');
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;

  this.index = function(x,y) {
    return x + (y * 10);
  }
  this.showFurry = function() {
    this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
  }
  this.hideVisibleFurry = function(){
    var divFurry = document.querySelector('.furry');
    divFurry.classList.remove('furry');
  }
  this.showCoin = function() {
    this.board[this.index(this.coin.x,this.coin.y)].classList.add('coin');
  }
  this.moveFurry = function() {
    this.hideVisibleFurry();
    if(this.furry.direction === "right") {
        this.furry.x = this.furry.x + 1;
      } else if(this.furry.direction === "left"){
        this.furry.x = this.furry.x - 1;
      } else if(this.furry.direction === "top"){
        this.furry.y = this.furry.y - 1;
      } else if(this.furry.direction === "bottom"){
        this.furry.y = this.furry.y + 1;
      }
      this.gameOver();
      this.showFurry();
      this.checkCoinCollision();

    }
    this.turnFurry = function(event){
      switch (event.which) {
        case 37:
          this.furry.direction = 'left';
          break;
        case 38:
          this.furry.direction = 'top';
          break;
        case 39:
          this.furry.direction = 'right';
          break;
        case 40:
          this.furry.direction = 'bottom';
    }
  }
  this.checkCoinCollision = function(){
    var showScore = document.querySelector('strong');
    if(this.board[this.index(this.furry.x,this.furry.y)] === this.board[this.index(this.coin.x,this.coin.y)]){
        this.board[this.index(this.coin.x,this.coin.y)].classList.remove('coin');
        this.score += 1;
        showScore.innerText = this.score;
        this.coin = new Coin();
        this.showCoin();
    }
  }
  this.gameOver = function(){
    if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
      clearInterval(this.idSetInterval);
      var over = document.querySelector('#over');
      over.classList.remove('invisible');
      var info = document.createElement('pre');
      over.appendChild(info);
      info.innerText = "GAME OVER! " + "FINAL SCORE: " + this.score;
      this.hideVisibleFurry();
    }
  }
  this.startGame = function() {
    var self = this;
    this.idSetInterval = setInterval(function(){
      self.moveFurry();
    }, 250);
  }
}

module.exports = Game;
