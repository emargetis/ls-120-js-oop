let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(foo());
console.log(bar());

/*
undefinedundefined WRONG, should be NaN
5

There are no global object properties `a` and `b` so when foo is invoked on line 12,
the return value of `this.a` and `this.b` will each return `undefined` and they
will be concatenated together.

On the other hand, the context of `bar` is permanently bound to `obj` so the
`a` and `b` properties of the `obj` will be accessed.
*/