
let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,
  
  describe() {
    console.log('Name: ' + this.name);
    console.log('ID: ' + this.id);
    console.log('Price: $' + this.price);
    console.log('Stock: ' + this.stock);
  },
  
  setPrice(newPrice) {
    if (newPrice < 0) {
      console.log('Price cannout be negative');
      return;
    }
    
    this.price = newPrice;
  },
  
};

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,
  
  describe() {
    console.log('Name: ' + this.name);
    console.log('ID: ' + this.id);
    console.log('Price: $' + this.price);
    console.log('Stock: ' + this.stock);
  },
  
  setPrice(newPrice) {
    if (newPrice < 0) {
      console.log('Price cannout be negative');
      return;
    }
    
    this.price = newPrice;
  },
};

scissors.setPrice(12);

scissors.describe();
// => Name: Scissors
// => ID: 0
// => Price: $10
// => Stock: 8