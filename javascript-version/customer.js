
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

