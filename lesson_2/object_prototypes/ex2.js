let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);

/*
3

`qux` has a property with a key `foo` and a value `1` therefore `qux.foo` will
access that value. `qux` is a prototype of `baz` so `baz` has access to `foo`
within `qux`. However, because line 3, creates a new property with a key `foo` 
and a value of `2`, when `baz.foo` is accessed, `baz` will be searched before 
`qux` for that property. `baz` now has it's own version of tha property which 
holds a value of 2. Therefore, when `baz.foo` is accessed the value will be 2 
and 2+1 is 3.

*/