let obj = {
  func: function() {
    return this;
  },
};

let context = obj.func();

console.log(context);

/*
LS Answer:
Unlike problem 1, this code outputs the object obj since it invokes func as a method. The output looks like this in Node:

Copy Code
{ func: [Function: func] }
As a method invocation, it receives an implicit execution context that refers to the object used to invoke it.
*/

/* 
WRONG
The output is the same as 1, the `global` object (`windows` if in a browswer).

The reason is that the method is invoked in a global context and not within `obj`
*/