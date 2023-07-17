let readline = require("readline-sync"); // first line in ttt.js

class Square {
  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
  
  resetSquare() {
    this.marker = Square.UNUSED_SQUARE;
  }
}

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

class Board {
  constructor() {
    this.reset();
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}  `);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}  `);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}  `);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log('');
    console.log('');
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.isUnusedSquare(key));
  }
  
  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
  
  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class MatchScore {
  static MATCH_GOAL = 3;
  
  constructor() {
    this.humanScore = 0;
    this.computerScore = 0;
  }
  
  matchWon() {
    
    if (this.humanScore === MatchScore.MATCH_GOAL) {
      return 'human';
    } else if (this.computerScore === MatchScore.MATCH_GOAL) {
      return 'computer';
    }
 
    return null;
  }
  
  addOneHuman() {
    this.humanScore += 1;
  }
  
  addOneComputer() {
    this.computerScore += 1;
  }
  
  
  displayScore() {
    console.log(`You Wins: ${this.humanScore} | Computer Wins: ${this.computerScore}`);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.matchScore = new MatchScore();
    this.firstPlayer = this.human;
  }

  play() {
    //SPIKE
    this.displayWelcomeMessage();
    this.board.display();
    
    while (true) {
      while (true) {
        this.firstPlayerMoves();
        if (this.gameOver()) break;
        
        this.board.displayWithClear();
  
        this.secondPlayerMoves();
        if (this.gameOver()) break;
  
        this.board.displayWithClear();
      }

      this.board.displayWithClear();
      this.toggleFirst();
      this.incrementScore();
      this.displayResults();
      this.matchScore.displayScore();
      
      if (this.matchScore.matchWon()) {
        this.displayMatchWinner();  
        break;
      }
      
      if (!this.playAgain()) break;
      this.board.reset();
      this.board.displayWithClear();
    }

    this.displayGoodbyeMessage();
  }
  
  incrementScore() {
    if (this.isWinner(this.human)) {
      this.matchScore.addOneHuman();
    } else if (this.isWinner(this.computer)) {
      this.matchScore.addOneComputer();
    }
  }
  
  displayMatchWinner() {
    console.clear();
    if (this.matchScore.matchWon() === 'human') {
      this.matchScore.displayScore();
      console.log('You won the match!');
    } else if (this.matchScore.matchWon() === 'computer') {
      console.log('Computer won the match!');
    }
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe! First to win 3 games wins the match.");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }
  
  playAgain() {
    console.log('Do you want to play another game in match? (Y / N)');
    let choice = readline.question().trim().toLowerCase();
    
    while(true) {
      if (['y', 'n'].includes(choice)) break;
      console.log('Invalid input. Please enter "Y" or "N"');
      choice = readline.question().trim().toLowerCase();
    }
    
    return choice === 'y';
  }
  
  toggleFirst() {
    if (this.firstPlayer === this.human) {
      this.firstPlayer = this.computer;
    } else if (this.firstPlayer === this.computer) {
      this.firstPlayer = this.human;
    }
  }
  
  firstPlayerMoves() {
    if (this.firstPlayer === this.human) {
      this.humanMoves();
    } else if (this.firstPlayer === this.computer) {
      this.computerMoves();
    }
  }
  
  secondPlayerMoves() {
    if (this.firstPlayer === this.human) {
      this.computerMoves();
    } else if (this.firstPlayer === this.computer) {
      this.humanMoves();
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;
      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }
  
  static joinOr(array, separator = ', ', keyword = 'or') {
    let returnStr = '';
    
    array.forEach((ele, idx) => {
      if (idx === 0) {
        returnStr += ele;
      } else if (idx === array.length - 1) {
        returnStr += ' ' + keyword + ' ' + ele; 
      } else {
        returnStr += separator + ele;
      }
    });
    
    return returnStr;
  }

  computerMoves() {
    let choice = this.offensiveComputerMove() ||
      this.defensiveComputerMove(this.human) ||
      this.centerSquare() ||
      this.pickRandomSquare();

    this.board.markSquareAt(choice, this.computer.getMarker());
  }
  
  offensiveComputerMove() {
    return this.findOpportuneSquare(this.computer);
  }
  
  defensiveComputerMove() {
    return this.findOpportuneSquare(this.human);
  }

  findOpportuneSquare(player) {
    for (let idx = 0; idx < TTTGame.POSSIBLE_WINNING_ROWS.length; idx ++) {
      let row = TTTGame.POSSIBLE_WINNING_ROWS[idx];
      let key = this.opportuneSquare(player, row);
      if (key) return key;
    }
    
    return null;
  }
  
  opportuneSquare(player, row) {
    if (this.board.countMarkersFor(player, row) === 2) {
      let index = row.findIndex(key => this.board.isUnusedSquare(key));
      if (index >= 0) return row[index]; 
    }
    
    return null;
  }
  
  centerSquare() {
    return this.board.isUnusedSquare('5') ? '5' : null;
  }
  
  pickRandomSquare() {
    let validChoices = this.board.unusedSquares();
    let choice;
      
    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    
    return choice;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}

let game = new TTTGame();
game.play();