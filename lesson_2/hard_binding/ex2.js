let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);

/* 
Nothing wil be logged to the console because nothing is invoked except the 
`bind` method which just returns a new function.
*/