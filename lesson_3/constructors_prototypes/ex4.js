function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());

/*
The above code will output `True` to the console.

The reason is that the function on line 1 is a constructor function. This is 
indicated by the uppercase first letter of the function name `Ninja`. On line 5,
this is confirmed on line 5 when the `Ninja` function is called on line 5
preceeded by the `New` keyword which invokes the function as a constructor.
The `new` keyword does the following:
1. Creates a new object 
2. Sets the prototype of the new object to the object that `prototype` property of the `Ninja` object points to.`
3. Assigns the value of `this` the new object to set the execution context inside the fucntion
4. Invokes the `Ninja` function
5. Returns the new object

Then on line 7, a method `swingSword` is set in the prototype object that the `Ninja` constructor property points to, which is
the prototype object of the `ninja` object. This method returns the value of `this.swung`.

When the `swingSword()` is invoked on the line 11 as an argument to the `console.log` method, the context is set to the `ninja` object.
Although the `ninja` object delegates the invocation of `swingSword` to its prototype object, the context does not change for the execution of the method
and is still the `ninja` object which has a `swung` property with a value of `true`.
*/