const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Object.assign(Car.prototype, Speed);
console.log(Car.prototype.hasOwnProperty('goFast'));

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
Object.assign(Truck.prototype, Speed);
console.log(Truck.prototype.hasOwnProperty('goFast'));

/* 
The name of the type of vehicle is logged by calling the `constructor` property, 
found on the calling object and which points to the constructor function object 
of the object prototype. The automatically created `name` property of a function
object returns the name of the function. 
*/