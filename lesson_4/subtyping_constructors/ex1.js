function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};

// let hello = new Hello();
// hello.hi(); //logs 'Hello!' - CORRECT

// let hello = new Hello();
// hello.bye(); //throws a type error because `bye` by will not be found in hello - CORRECT

// let hello = new Hello();
// hello.greet(); //`undefined` will be logged to the console - CORRECT

// let hello = new Hello();
// hello.greet('Goodbye'); //'Goodbye' will be logged to the console - CORRECT

// Hello.hi(); //error will be thrown becauswe we don't have an object hello and the `hi` method is an instance method, not a static method - CORRECT

