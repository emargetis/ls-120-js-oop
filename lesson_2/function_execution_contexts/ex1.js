function func() {
  return this;
}

let context = func();

console.log(context);

/*
The above code will output `global`, the global object (it would be `windows` in a browswer).

The variable `context` declared on line 5 points to a value of `this` which points to the global object given that func is invoked on line 5 with `func()`.
Therefore, console.log() will log `global`
*/