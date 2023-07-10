const readline = require("readline-sync");
const GAME_WINS = 3;
const AGAIN_CHOICES = ['yes', 'no', 'y', 'n'];
const MOVE_CHOICES = {
  r: 'rock',
  p: 'paper',
  sc: 'scissors',
  l: 'lizard',
  sp: 'spock'
};
const WINNING_COMBOS = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock',     'spock'],
  scissors: ['paper',    'lizard'],
  lizard:   ['paper',    'spock'],
  spock:    ['rock',     'scissors'],
};
const STARTING_SCORE = 0;

// eslint-disable-next-line max-lines-per-function
function createPlayer() {
  return {
    name: null,
    move: null,
    score: STARTING_SCORE,
    moveHistory: [], //move: w / l

    addMoveToHistory(move, result) {
      this.moveHistory.push([move, result]);
    },

    incrementScore() {
      this.score += 1;
    },

    resetScore() {
      this.score = STARTING_SCORE;
    },

    setName(input) {
      this.name = input;
    },

    getName() {
      return this.name;
    },

    getMove() {
      return this.move;
    },

    getScore() {
      return this.score;
    },

    getMoveHistory() {
      return this.moveHistory;
    },

    setMove(move) {
      this.move = move;
    },


  };
}

function createBlankMoveTypeWinPercentage() {
  let moveWinPercentage = {};

  for (let move in MOVE_CHOICES) {
    moveWinPercentage[MOVE_CHOICES[move]] = 0;
  }

  return moveWinPercentage;
}

// eslint-disable-next-line max-lines-per-function
function createComputer() {
  let playerObject = createPlayer();

  playerObject.setName('computer');

  let computerObject = {

    updateMoveTypeWinPercentage(moveTypeWinPercentage) {
      for (let moveType in moveTypeWinPercentage) {
        let picks = this.getMoveHistory().filter(game => {
          return game[0] === moveType && game[1] !== 'loss';
        }).length;

        let wins = this.getMoveHistory().filter(game => {
          return game[0] === moveType && game[1] === 'win';
        }).length;

        moveTypeWinPercentage[moveType] = (wins / picks) * 10;
      }
    },

    setWeightedChoices() {
      let moveTypeWinPercentage = createBlankMoveTypeWinPercentage();
      let weightedChoiceArray = [];

      this.updateMoveTypeWinPercentage(moveTypeWinPercentage);

      for (let moveType in moveTypeWinPercentage) {
        let additionalMoves = 0;

        if (moveTypeWinPercentage[moveType] > 5) {
          additionalMoves = Math.ceil(moveTypeWinPercentage[moveType] - 5);
        }

        for (let idx = 1; idx <= 10 + additionalMoves; idx++) {
          weightedChoiceArray.push(moveType);
        }
      }

      return weightedChoiceArray;
    },

    choose() {
      let choiceArray = this.setWeightedChoices();
      let randomIndex = Math.floor(Math.random() * choiceArray.length);
      this.setMove(choiceArray[randomIndex]);
    },
  };

  return Object.assign(playerObject, computerObject);
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let playerObject = createPlayer();

  playerObject.setName('human');

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock (r), paper (p), scissors (sc), spock (sp), or lizard(l):');
        choice = readline.question().trim().toLowerCase();
        if (Object.values(MOVE_CHOICES).includes(choice)) {
          this.setMove(choice);
          break;
        } else if (Object.keys(MOVE_CHOICES).includes(choice)) {
          this.setMove(MOVE_CHOICES[choice]);
          break;
        }

        console.log('Sorry, invalid choice.');
      }
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayDivider() {
    console.log('\n-----------------------------------');
  },

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Rock, Paper, Scissors, Spock, Lizard! \n' +
                `First to win ${GAME_WINS} games the match.`);
    this.displayDivider();
  },

  displayGoodbyeMessage() {
    console.log('Thank you for playing Rock, Paper, Scissors, Spock, Lizard. Goodbye!');
  },

  getGameWinner() {
    let humanMove = this.human.getMove();
    let computerMove = this.computer.getMove();

    if (humanMove === computerMove) {
      return 'tie';
    } else if (WINNING_COMBOS[humanMove].includes(computerMove)) {
      return this.human.getName();
    } else {
      return this.computer.getName();
    }
  },

  displayGameWinner() {
    let humanMove = this.human.getMove();
    let computerMove = this.computer.getMove();
    let winner = this.getGameWinner();

    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);

    if (winner === 'tie') {
      console.log("It's a tie");
    } else if (winner === 'human') {
      console.log('You win!');
    } else {
      console.log('Computer wins!');
    }

    this.displayDivider();
  },

  addMovesToHistory() {
    let humanMove = this.human.getMove();
    let computerMove = this.computer.getMove();
    let winner = this.getGameWinner();

    if (winner === 'tie') {
      this.human.addMoveToHistory(humanMove, 'tie');
      this.computer.addMoveToHistory(computerMove, 'tie');
    } else if (winner === 'human') {
      this.human.addMoveToHistory(humanMove, 'win');
      this.computer.addMoveToHistory(computerMove, 'loss');
    } else {
      this.human.addMoveToHistory(humanMove, 'loss');
      this.computer.addMoveToHistory(computerMove, 'win');
    }
  },

  browseHistory() {
    console.log("Enter 'h' to see move history, otherwise press 'enter' to continue to next game.");

    while (true) {
      let input = readline.question();

      if (input === 'h') {
        this.displayMoveHistory();
        break;
      } else if (input === '') {
        break;
      } else {
        console.log("Invalid input. Enter 'h' to see move history, otherwise press 'enter' to continue to next game.");
      }
    }

    this.displayDivider();
  },

  getResultTypeCount(player, moveType, result) {
    return player.getMoveHistory().reduce((accum, currGame) => {
      if (currGame[0] === moveType && currGame[1] === result) {
        accum += 1;
      }
      return accum;
    }, 0);
  },

  displayMoveHistory() {
    this.displayDivider();

    let players = [this.human, this.computer];

    players.forEach(player => {
      console.log(`${player.getName()} Choices & Record History`);

      Object.values(MOVE_CHOICES).forEach(move => {
        let moveWins = this.getResultTypeCount(player, move, 'win');
        let moveLosses = this.getResultTypeCount(player, move, 'loss');
        let moveTies = this.getResultTypeCount(player, move, 'tie');

        console.log(`${move}: ${moveWins} wins | ${moveLosses} losses | ${moveTies} tie`);
      });

      console.log('\n');
    });

    this.exitHistory();
  },

  exitHistory() {
    console.log("Press 'enter' to exit history");

    while (true) {
      let input = readline.question().trim();
      if (input === '') break;
      console.log("Invalid input. Press 'enter' to exit history");
    }
  },

  updateScore() {
    let winner = this.getGameWinner();

    if (winner === 'human') {
      this.human.incrementScore();
    } else if (winner === 'computer') {
      this.computer.incrementScore();
    }
  },

  resetScore() {
    this.human.resetScore();
    this.computer.resetScore();
  },

  displayScore() {
    console.log(`Your wins: ${this.human.getScore()} | Computer wins: ${this.computer.getScore()}`);
    this.displayDivider();
  },

  displayMatchWinner() {
    if (this.human.getScore() === GAME_WINS) {
      console.log('You win the match with 5 game wins!');
    } else if (this.computer.getScore() === GAME_WINS) {
      console.log('Computer wins the match with 5 game wins. You lose :(');
    }
    this.displayDivider();
  },

  determineMatchWinner() {
    if (this.human.getScore() === GAME_WINS) {
      this.displayMatchWinner();
      return true;
    } else if (this.computer.getScore() === GAME_WINS) {
      this.displayMatchWinner();
      return true;
    }

    return false;
  },

  playAgain() {
    console.log('Would you like to play another match? (y/n)');

    let answer = readline.question().trim().toLowerCase();

    while (true) {
      if (AGAIN_CHOICES.includes(answer)) break;
      console.log("Invalid choice. Please enter 'y' or 'n'.");
      answer = readline.question().trim().toLowerCase();
    }

    this.displayDivider();

    return answer === 'yes' || answer === 'y';
  },

  playGame() {
    this.human.choose();
    this.computer.choose();
    this.displayGameWinner();
    this.updateScore();
    this.displayScore();
    this.addMovesToHistory();
    this.browseHistory();
    console.clear();
  },

  play() {
    while (true) {
      console.clear();
      this.displayWelcomeMessage();

      while (true) {
        this.playGame();
        if (this.determineMatchWinner()) break;
      }

      if (!this.playAgain()) break;
      this.resetScore();
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();