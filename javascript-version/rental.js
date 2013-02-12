
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
