function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());

/*
The code above will output a typeError

The reason is that the `ninja` object is created from the constructor
function `Ninja` on line 5 before the `prototype` property on the constructor
function is reassigned to a different object on lines 7-11. This means following
line 11, the prototype object of `ninja` is {} while the `Ninja.prototype` 
constructor property points to an entirely different object. Thus when the 
code attemps to invoke the `swingSword` method on line 13 in the context of the
`ninja` object it cannot find the method. Therefore, it throws a typeError.
*/