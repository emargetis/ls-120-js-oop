let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);

/* 
The output will be NaN then NaN

The reason the code outputs this is because on line 13 and line 14, the context
in which the `area()` and `perimiter()` methods execute are the object that
`RECTANGLE` points to. That object does not have a `width`` or a `height` property
so both of those values are `undefined`. When multiplying or adding `undefined` 
values together using the `*` and `+` operators we get NaN.
*/