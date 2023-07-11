let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);

/*
`Amazebulous!` will be logged to the console because the the context for bar
has been permanently bound so when it is invoked with the context on 14 via `call`
it will still use the original context
*/