let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);

/*
The code above will log 2 to the console.

On line 3, the `log` method is being invoked on the `console` object with an
argument of `baz.foo + qux.foo`. The dot notation `baz.foo` accesss the value 
of the `foo` key in the `baz` object which is the number `1` and the the same
goes for `qux.foo`. However, the `baz` object inherits the `foo` property from
its prototype `qux` because `baz` was created from the prototype `qux` using the
`Object.create` method on line 2. Therefore, `baz.foo` and `qux.foo` are really
accessing the same value of the foo property.
*/

/*
LS Solution:
Naturally, qux.foo returns 1 since qux has a foo property with that value. 
However, baz doesn't have its "own" copy of the foo property. Thus, JavaScript 
searches the prototype chain for a foo property and finds the property in qux. 
Thus, baz.foo is also 1, and the sum of the two values is 2.
*/