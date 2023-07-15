function Circle(inputRadius) {
  this.radius = inputRadius;
  
}

Circle.prototype.area = function() {
    return (Math.PI * (this.radius ** 2));
};

let a = new Circle(3);
let b = new Circle(4);

a.area().toFixed(2); // => 28.27
b.area().toFixed(2); // => 50.27
a.hasOwnProperty('area'); // => false