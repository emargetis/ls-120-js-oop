function setPrice(obj, newPrice) {
  if (newPrice < 0) {
    console.log('Price cannout be negative');
    return;
  }
  
  obj.price = newPrice;
}

function describeProduct(obj) {
  for (let key in obj) {
    if (key === 'price') {
      console.log(key + ': $' + obj[key]);
    } else {
      console.log(key + ': ' + obj[key]);
    }
  }
}


let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,
};

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,
};

setPrice(scissors, 12);

describeProduct(scissors);
// => Name: Scissors
// => ID: 0
// => Price: $10
// => Stock: 8