let bar = {qux: 9};
let foo = Object.create(bar);
foo['zap'] = 5;

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

/* 
The above code will not always log the same results to the console because
a `for...in` loop iterates over enumberabl prototype properties while the 
`Object.keys` method returns an array of only prorties defined within that
object itself, i.e. its "own" properties. Run code to see example.
*/