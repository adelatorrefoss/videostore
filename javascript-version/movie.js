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

