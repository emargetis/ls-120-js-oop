//My Solution -----------------------------------------------------

const Wheels = {
  setTirePressure(tirePressure) {
    this.tires = tirePressure;
  },
  
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  },
  
  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
  
};

class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

class Auto extends Vehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super(50, 25.0);
  }
}

Object.assign(Auto, Wheels);
Auto.setTirePressure([30,30,32,32]);

class Motorcycle extends Vehicle {
  constructor() {
    // array represents tire pressure for two tires
    super(80, 8.0);
  }
}

Object.assign(Motorcycle, Wheels);
Auto.setTirePressure([20,20]);

class Catamaran extends Vehicle {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}

//LS Solution -----------------------------------------------------

// const Moveable = {
//   range() {
//     return this.fuelCap * this.fuelEfficiency;
//   }
// };

// class WheeledVehicle {
//   constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
//     this.tires = tirePressure;
//     this.fuelEfficiency = kmTravelledPerLiter;
//     this.fuelCap = fuelCapInLiter;
//   }

//   tirePressure(tireIdx) {
//     return this.tires[tireIdx];
//   }

//   inflateTire(tireIdx, pressure) {
//     this.tires[tireIdx] = pressure;
//   }
// }

// Object.assign(WheeledVehicle.prototype, Moveable);

// class Auto extends WheeledVehicle {
//   constructor() {
//     // the array represents tire pressure for four tires
//     super([30,30,32,32], 50, 25.0);
//   }
// }

// class Motorcycle extends WheeledVehicle {
//   constructor() {
//     // array represents tire pressure for two tires
//     super([20,20], 80, 8.0);
//   }
// }

// class Catamaran {
//   constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
//     // catamaran specific logic

//     this.propellerCount = propellerCount;
//     this.hullCount = hullCount;
//     this.fuelEfficiency = kmTravelledPerLiter;
//     this.fuelCap = fuelCapInLiter;
//   }
// }

// Object.assign(Catamaran.prototype, Moveable);