let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);


/*
The above code will log `undefined undefined is a undefined`. When the 
`getDescription` is passed into the `logReturnVal` function as an arument when
`logReturnVal` is executed on line 16, the `getDescription` method will assume
the context it is executed in (line 12 as the parameter `func`), which is then 
the global object. The global object does not have properties `firstName`, 
`lastName` or `occupaction`, therefore all of those property accesses evaluate
to `undefined`.
*/