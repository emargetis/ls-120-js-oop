let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

console.log(bar.add.call(foo));

/* 
This will return 3 because we are changing the scope of the `add` method from
the implicit `bar` by explicitly calling the `call` method with an argument of 
the object `foo`
*/