class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}

/*
The `play` method in `Bingo` class would override the `play` method in the `Game`
class because an instance of the `Bingo` class would first look at the closest 
links in the prototpe chain.

When class redefines a method that a superclass defines, we call this 
"method overriding".
*/