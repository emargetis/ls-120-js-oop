message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage();

/*
The above code will log 'Hello from the global scope!' then 'Hello from the function scope!'

The first line will be logged because the function `deliverMessage()` is executed in the global
scope and `this` implicitly refers to the global object where `message` is a property of the global object. This `message` property is set on line 1.

The second line will be logged because when the method `foo.deliverMessage()` executed, it implicitly executes it within the object `foo`
which has a `message` property with a value of `'Hello from the function scope!'`.
*/