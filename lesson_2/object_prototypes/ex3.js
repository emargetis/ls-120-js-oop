let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo);

/*
4

After line 1, `qux` has a property with a key `foo` and a value `1`, but that
value is reassigned to `2` on line 3. Therefore `qux.foo` will access that 
value. `qux` is a prototype of `baz` so `baz` has access to `foo`
within `qux`. When `baz.foo` is accessed, `baz` will be searched for `foo`, 
however it does not have its own property `foo` so `qux` will be searched for 
that property As mentioned above, `qux.foo` hold a value 2. Therefore, when 
`baz.foo` is accessed the value will be 2 and 2+2 is 4.

*/