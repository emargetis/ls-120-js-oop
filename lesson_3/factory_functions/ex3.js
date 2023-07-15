function createInvoice(services = {}) {
  // implement the factory function here
  let returnObj = {
    phone: 3000,
    internet: 5500,
    payments: [],
    
    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      payments.forEach(payment => this.payments.push(payment));
    },

    paymentTotal() {
      return this.payments.reduce((sum, payment) => sum + payment.total(), 0);
    },

    amountDue() {
      return this.total() - this.paymentTotal();
    },
  };
  
  if(services.hasOwnProperty('phone')) {
    returnObj.phone = services.phone;
  }
  
  if(services.hasOwnProperty('internet')) {
    returnObj.internet = services.internet;
  }
    
  return returnObj;  
}


function createPayment(services = {}) {
  // implement the factory function here
  let phonePayment = services.phone || 0;
  let internetPayment = services.internet || 0;
  let amountPayment = services.amount;

  return {
    phone: phonePayment,
    internet: internetPayment,
    amount: amountPayment,
    
    total() {
      return this.amount || this.phone + this.internet;
    }
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0