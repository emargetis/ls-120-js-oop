let logResult = function(func) {
  let result = func();
  console.log(result);
  return result;
};

let foo = function() {
  let self = this;
  let sue = {
    name: 'Sue Perkins',
    age: 37,
    myAge() {
      return `${self.name} is ${self.age} years old`;
    },
  };
  logResult(sue.myAge);
};

foo();