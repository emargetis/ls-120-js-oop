//Create object that does not have a prototype
let nullObj = Object.create(null);

//Use some form of .getPrototypeOf comparison with an object to determine if it has a prototype.
console.log(Object.getPrototypeOf(nullObj) === null);

/*
LS Solution:

if (Object.getPrototypeOf(obj)) {
  // obj has a prototype
} else {
  // obj does not have a prototype
}
*/