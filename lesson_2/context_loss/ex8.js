let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a)

/*
The value of `foo.a` will be 0 after execution. This is because the nested function
will assume the context of where it is executed, which in this case will be the global
object. The global object does not have a property of `a` thefefore `this.a` within 
the nested function will continually evaluate to undefined.
*/