
load("movie.js");
load("rental.js");
load("customer.js");

function assertEquals(message, expected, actual) {
  if (expected === actual) {
    print(".");
  } else {
    println("\nE: " + message + "\n--Expected: " + expected + "\n--Actual: " + actual);
  }
}

function testSingleNewReleaseStatement() {
  var customer = newCustomer("Fred");
  customer.addRental(newRental(newMovie("The Cell", Movie.NEW_RELEASE), 3));    
  assertEquals("testSingleNewReleaseStatement", "Rental Record for Fred\n\tThe Cell\t9.0\nYou owed 9.0\nYou earned 2 frequent renter points\n", customer.statement());
}

function testDualNewReleaseStatement() {
  var customer = newCustomer("Fred");
  customer.addRental(newRental(newMovie("The Cell", Movie.NEW_RELEASE), 3));
  customer.addRental(newRental(newMovie("The Tigger Movie", Movie.NEW_RELEASE), 3));    
  assertEquals("testDualNewReleaseStatement", "Rental Record for Fred\n\tThe Cell\t9.0\n\tThe Tigger Movie\t9.0\nYou owed 18.0\nYou earned 4 frequent renter points\n", customer.statement());
}

function testSingleChildrensStatement() {
  var customer = newCustomer("Fred");
  customer.addRental(newRental(newMovie("The Tigger Movie", Movie.CHILDRENS), 3));
  assertEquals("testSingleChildrensStatement", "Rental Record for Fred\n\tThe Tigger Movie\t1.5\nYou owed 1.5\nYou earned 1 frequent renter points\n", customer.statement());
}

function testMultipleRegularStatement() {
  var customer = newCustomer("Fred");
  customer.addRental(newRental(newMovie("Plan 9 from Outer Space", Movie.REGULAR), 1));
  customer.addRental(newRental(newMovie("8 1/2", Movie.REGULAR), 2));
  customer.addRental(newRental(newMovie("Eraserhead", Movie.REGULAR), 3));

  assertEquals("testMultipleRegularStatement", "Rental Record for Fred\n\tPlan 9 from Outer Space\t2.0\n\t8 1/2\t2.0\n\tEraserhead\t3.5\nYou owed 7.5\nYou earned 3 frequent renter points\n", customer.statement());
}

testSingleNewReleaseStatement();
testDualNewReleaseStatement();
testSingleChildrensStatement();
testMultipleRegularStatement();
print("\n");
