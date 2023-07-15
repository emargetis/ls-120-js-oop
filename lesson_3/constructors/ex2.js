function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = Lizard();
lizzy.scamper(); // ?

/*
It  will return an error because the `new` keyword was left out
of line 7. Because the keyword is left out on line 7, lizzy is assigned a value
of `undefined`. Therefore, when the `scamper` method is called on `undefined`,
a typeError will be thrown.

WRONG - originally said ReferenceError, but it is a TypeError:

`TypeError: Cannot read properties of undefined (reading 'scamper')`
*/