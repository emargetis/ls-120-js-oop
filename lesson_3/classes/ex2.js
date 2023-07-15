class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}

/* 

The static modifier treats that method like a static method, meaning that it
is not accessible to an instance object of the `Television` class because it is 
defined directly on the class.

To call the method manufacturer you would write code like this:
Television.manufacturer()

*/