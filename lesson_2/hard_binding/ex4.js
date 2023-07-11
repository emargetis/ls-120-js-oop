let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positivity);

negativity.logMessage = bar;
negativity.logMessage();

/*
`Javascript makes sense!` will be logged to the console because the context is
permanently bound to the function `bar` points to which is then the same value 
that the method negativity.logMessage points to.
*/