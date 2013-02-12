
var Movie = {
  REGULAR: 1,
  NEW_RELEASE: 2,
  CHILDRENS: 3,
};

function newMovie(title, priceCode) {
  return {
    getPriceCode: function() {
    	return priceCode;
    },

    setPriceCode: function(code) {
    	priceCode = code;
    },

    getTitle: function() {
    	return title;
    },
  };
}


function newRental(movie, daysRented) {
  return {
    getDaysRented: function() {
      return daysRented;
    },
    
    getMovie: function() {
      return movie;
    },    
  };
}

function newCustomer(name) {
  var rentals = [];
  
  function formatMoney(money) {
    return money.toFixed(1);
  };
  
  return {
    addRental: function(rental) {
      rentals.push(rental);
    },

    getName: function() {
      return name;
    },
    
    statement: function() {
      var totalAmount = 0;
      var frequentRenterPoints  = 0;
      var result = "Rental Record for " + this.getName() + "\n";

      for (var i=0; i<rentals.length; i++) {
        var each = rentals[i];
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
                  + formatMoney(thisAmount) + "\n";
        totalAmount += thisAmount;      
      }

      result += "You owed " + formatMoney(totalAmount) + "\n";
      result += "You earned " + frequentRenterPoints + " frequent renter points\n";

      return result;
    },
  };
}


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
println("");
