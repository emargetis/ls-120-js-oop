function setPrice(obj, newPrice) {
  if (newPrice < 0) {
    console.log('Price cannout be negative');
    return;
  }
  
  obj.price = newPrice;
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
