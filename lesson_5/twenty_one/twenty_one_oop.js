const readline = require('readline-sync');

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    if (this.rank === 'A') {
      this.value = 11;
    } else if (['J', 'Q', 'K'].includes(this.rank)) {
      this.value = 10;
    } else {
      this.value = Number(this.rank);
    }
  }

  reduceAceValue() {
    this.value = 1;
  }

  getSuit() {
    return this.suit;
  }

  getRank() {
    return this.rank;
  }

  getValue() {
    return this.value;
  }
}

class Deck {
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  static SUITS = ['H', 'S', 'D', 'C'];

  constructor() {
    this.newDeck();
  }

  newDeck() {
    this.deck = [];

    Deck.RANKS.forEach(rank => {
      Deck.SUITS.forEach(suit => {
        this.deck.push(new Card(rank, suit));
      });
    });

    this.shuffle(this.deck);
  }

  shuffle(deck) {
    for (let index = deck.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
      [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]]; // swap elements
    }
  }

  deal() {
    return this.deck.shift();
  }
}

class Participant {
  constructor() {
    this.hand = [];
    this.score = 0;
    this.onlyFirst = null;
  }

  hit(card) {
    this.hand.push(card);
  }

  resetHand() {
    this.hand = [];
  }

  isBusted() {
    return this.score > 21;
  }

  getScore() {
    this.calculateScore();
    return this.score;
  }

  calculateScore() {
    this.score = this.hand.reduce((sum, card) => sum + card.getValue(), 0);

    if (this.isBusted()) {
      for (let idx = 0; idx < this.hand.length; idx++) {
        let card = this.getCard(idx);
        if (card.getRank() === 'A') {
          card.reduceAceValue();
        }

        this.score = this.hand.reduce((sum, card) => sum + card.getValue(), 0);
        if (!this.isBusted()) break;
      }
    }
  }

  showHand() {
    let handStr = '';

    if (this.onlyFirst) {
      handStr += this.getCard(0).getRank() + this.getCard(0).getSuit();
    } else {
      this.hand.forEach((card, idx) => {
        if (idx > 0) {
          handStr += ', ';
        }

        handStr += card['rank'] + card['suit'];
      });
    }

    return handStr;
  }

  getCard(idx) {
    return this.hand[idx];
  }

  hideHand() {
    this.onlyFirst = true;
  }

  revealHand() {
    this.onlyFirst = false;
  }
}

class Player extends Participant {
  static START_BALANCE = 5;
  static WINNING_BALANCE = 2 * Player.START_BALANCE;
  static BROKE_BALANCE = 0;
  static WAGER_AMOUNT = 1;

  constructor() {
    super();
    this.revealHand();
    this.moneyBalance = Player.START_BALANCE;
  }

  addOneBalance() {
    this.moneyBalance += Player.WAGER_AMOUNT;
  }

  deductOneBalance() {
    this.moneyBalance -= Player.WAGER_AMOUNT;
  }
  
  isBroke() {
    return this.moneyBalance <= TwentyOneGame.BROKE_BALANCE;
  }
  
  beatHouse() {
    return this.moneyBalance >= TwentyOneGame.WINNING_BALANCE;
  }
}

class Dealer extends Participant {
  static DEALER_MINIMUM = 17;

  constructor() {
    super();
    this.hideHand();
  }

  isAboveMinimum() {
    return this.score >= Dealer.DEALER_MINIMUM;
  }
}

class TwentyOneGame {

  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.displayMoneyBalance();
      this.playHand();
      this.displayMoneyBalance();
      if (this.player.beatHouse()) break;
      if (this.player.isBroke()) break;
      if (!this.playAgain()) break;
      console.clear();
    }

    this.displayOverallResult();
    this.displayGoodbyeMessage();
  }

  playHand() {
    this.deck.newDeck();
    this.player.resetHand();
    this.dealer.resetHand();
    this.dealer.hideHand();
    this.dealCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayDivider();
    this.displayResult();
    this.payOut();
  }

  dealCards() {
    this.player.hit(this.deck.deal());
    this.dealer.hit(this.deck.deal());
    this.player.hit(this.deck.deal());
    this.dealer.hit(this.deck.deal());
  }

  playerHitorStay() {
    console.log('Do you want to hit (H) or stay (S)? ');
    let choice = readline.question().trim().toLowerCase();

    while (true) {
      if (['h', 's'].includes(choice)) break;
      console.log('Invalid choice. Enter "H" for hit or "S" for stay.');
      choice = readline.question().trim().toLowerCase();
    }

    return choice;
  }

  playerTurn() {
    while (true) {
      this.displayCardsNoDealerTotal();
      this.displayDivider();

      let choice = this.playerHitorStay();

      if (choice === 'h') {
        this.player.hit(this.deck.deal());
      } else if (choice === 's') {
        break;
      }

      console.clear();
      this.player.calculateScore();
      if (this.player.isBusted()) break;
    }

    this.displayDivider();
  }

  displayCardsNoDealerTotal() {
    console.log(`Your cards: ${this.player.showHand()}`);
    console.log(`Your hand total: ${this.player.getScore()}`);
    console.log('---------------------');
    console.log(`Dealer's cards: ${this.dealer.showHand()}`);
  }

  displayDealerTotal() {
    console.log(`Dealer's hand total: ${this.dealer.getScore()}`);
  }

  dealerTurn() {
    //STUB
    if (this.player.isBusted()) return;
    this.dealer.revealHand();

    while (true) {
      this.displayCardsNoDealerTotal();
      this.displayDealerTotal();

      if (this.dealer.isAboveMinimum()) break;
      this.dealer.hit(this.deck.deal());

      this.dealer.calculateScore();
      console.clear();
    }

    this.displayDivider();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to 21!\n\n'
      + `- The object of this game is to reach $${Player.WINNING_BALANCE}.\n`
      + `- You will start with a $${Player.START_BALANCE} balance and each time you win a\n`
      + '  hand, $1 will be added to your balance.\n'
      + `- If you lose the hand, $${Player.WAGER_AMOUNT} will be decucted from your balance.\n`
      + '- To win a hand, your hand total must be <= 21 and higher than\n'
      + "  the dealer's hand total.\n"
    );
    this.displayDivider();
  }

  displayGoodbyeMessage() {
    console.log('Thank you for playing 21! Come back again soon!');
  }

  displayResult() {
    console.clear();
    this.displayCardsNoDealerTotal();

    if (this.player.isBusted()) {
      console.log('You busted :(');
      return;
    }

    this.displayDealerTotal();

    this.displayDivider();

    if (this.dealer.isBusted()) {
      console.log('Dealer busted. You win :)');
    } else if (this.dealer.getScore() > this.player.getScore()) {
      console.log('Dealer wins. You lose :(');
    } else if (this.dealer.getScore() < this.player.getScore()) {
      console.log('You win :)');
    } else {
      console.log('Game was a push :|');
    }

    this.displayDivider();
  }

  payOut() {
    if (this.player.isBusted()) {
      this.player.deductOneBalance();
    } else if (this.dealer.isBusted()) {
      this.player.addOneBalance();
    } else if (this.dealer.getScore() > this.player.getScore()) {
      this.player.deductOneBalance();
    } else if (this.dealer.getScore() < this.player.getScore()) {
      this.player.addOneBalance();
    }
  }

  displayMoneyBalance() {
    console.log(`You current balance is: $${this.player.moneyBalance}`);
    this.displayDivider();
  }

  displayDivider() {
    console.log('************************************************************');
  }

  playAgain() {
    console.log('Do you want to play another hand? (Y / N)');
    let choice = readline.question().trim().toLowerCase();

    while (true) {
      if (['y', 'n'].includes(choice)) break;
      console.log('Invalid input. Please enter "Y" or "N"');
      choice = readline.question().trim().toLowerCase();
    }

    return choice === 'y';
  }

  displayOverallResult() {
    console.clear();
    this.displayMoneyBalance();
    if (this.player.beatHouse()) {
      console.log('Congratulations! You beat the house :)');
    } else if (this.player.isBroke()) {
      console.log('Thanks for donating all your money to the house!');
    } else {
      console.log("Please don't walk away");
    }
    this.displayDivider();
  }
}

let game = new TwentyOneGame();
game.start();