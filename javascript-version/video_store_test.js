
function Movie(title, priceCode) {
	this.title 		= title;
	this.priceCode 	= priceCode;
}

Movie.prototype.getPriceCode = function() {
	return this.priceCode;
}

Movie.prototype.setPriceCode = function(code) {
	this.priceCode = code;
}

Movie.prototype.getTitle = function() {
	return this.title;
}

Movie.REGULAR = 1;
Movie.NEW_RELEASE = 2;
Movie.CHILDRENS = 3;

function Rental(movie, daysRented) {
	this.movie 		= movie;
	this.daysRented = daysRented;
}
	
Rental.prototype.getDaysRented = function() {
	return this.daysRented;
}
	
Rental.prototype.getMovie = function() {
	return this.movie;
}

function Customer(name) {
  this.rentals = [];
  this.name = name;
}
  
Customer.prototype.addRental = function(rental) {
  this.rentals[this.rentals.length] = rental;
}

Customer.prototype.getName = function() {
  return this.name;
}

Customer.prototype.statement = function() {
  var totalAmount = 0;
  var frequentRenterPoints  = 0;
  var result = "Rental Record for " + this.getName() + "\n";
  var each;

  for (var i=0; i<this.rentals.length; i++) {
    var each = this.rentals[i];
    var thisAmount = 0;
    
    // determines the amount for each line
    switch (each.getMovie().getPriceCode()) {
      case Movie.REGULAR:
        thisAmount += 2;
        if (each.getDaysRented () > 2)
          thisAmount += (each.getDaysRented () - 2) * 1.5;
        break;
      case Movie.NEW_RELEASE:
        thisAmount += each.getDaysRented () * 3;
        break;
      case Movie.CHILDRENS:
        thisAmount += 1.5;
        if (each.getDaysRented () > 3)
          thisAmount += (each.getDaysRented () - 3) * 1.5;
        break;
    }
    
    frequentRenterPoints++;
    
    if (each.getMovie().getPriceCode() == Movie.NEW_RELEASE 
        && each.getDaysRented() > 1)
      frequentRenterPoints++;

    result += "\t" + each.getMovie().getTitle() + "\t"
              + thisAmount + "\n";
    totalAmount += thisAmount;      
  }
  
  result += "You owed " + totalAmount + "\n";
  result += "You earned " + frequentRenterPoints + " frequent renter points\n";
    
  return result;
}

function assertEquals(message, expected, actual) {
  if (expected === actual) {
    print(".");
  } else {
    println("\nE: " + message + "\n--Expected: " + expected + "\n--Actual: " + actual);
  }
}

function testSingleNewReleaseStatement() {
  customer.addRental(new Rental(new Movie("The Cell", Movie.NEW_RELEASE), 3));    
  assertEquals("testSingleNewReleaseStatement", "Rental Record for Fred\n\tThe Cell\t9.0\nYou owed 9.0\nYou earned 2 frequent renter points\n", customer.statement());
}

public void testDualNewReleaseStatement() {
 customer.addRental(new Rental(new Movie("The Cell", Movie.NEW_RELEASE), 3));
 customer.addRental(new Rental(new Movie("The Tigger Movie", Movie.NEW_RELEASE), 3));    
 assertEquals("Rental Record for Fred\n\tThe Cell\t9.0\n\tThe Tigger Movie\t9.0\nYou owed 18.0\nYou earned 4 frequent renter points\n", customer.statement());
}

// public void testSingleChildrensStatement() {
//  customer.addRental(new Rental(new Movie("The Tigger Movie", Movie.CHILDRENS), 3));
//  assertEquals("Rental Record for Fred\n\tThe Tigger Movie\t1.5\nYou owed 1.5\nYou earned 1 frequent renter points\n", customer.statement());
// }
// 
// public void testMultipleRegularStatement() {
//  customer.addRental(new Rental(new Movie("Plan 9 from Outer Space", Movie.REGULAR), 1));
//  customer.addRental(new Rental(new Movie("8 1/2", Movie.REGULAR), 2));
//  customer.addRental(new Rental(new Movie("Eraserhead", Movie.REGULAR), 3));
//  
//  assertEquals("Rental Record for Fred\n\tPlan 9 from Outer Space\t2.0\n\t8 1/2\t2.0\n\tEraserhead\t3.5\nYou owed 7.5\nYou earned 3 frequent renter points\n", customer.statement());
// }

var customer = new Customer("Fred");
testSingleNewReleaseStatement();

