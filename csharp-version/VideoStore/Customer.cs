using System;
using System.Collections.Generic;

namespace VideoStore
{
	public class Customer 
	{		
		private string name;
		private List<Rental> rentals = new List<Rental> ();

		public Customer (string name) {
			this.name = name;
		}

		public void AddRental(Rental rental) {
			rentals.Add(rental);
		}

		public string GetName () {
			return name;
		}

		public string Statement () {
			double 				totalAmount 			= 0;
			int					frequentRenterPoints 	= 0;
			var 				rentals 				= this.rentals.GetEnumerator();
			string 				result 					= "Rental Record for " + GetName () + "\n";

			while (rentals.MoveNext()) {
				double 		thisAmount = 0;
				Rental 		each = rentals.Current;

				// determines the amount for each line
				switch (each.GetMovie ().GetPriceCode ()) {
					case Movie.REGULAR:
					thisAmount += 2;
					if (each.GetDaysRented () > 2)
						thisAmount += (each.GetDaysRented () - 2) * 1.5;
					break;
					case Movie.NEW_RELEASE:
					thisAmount += each.GetDaysRented () * 3;
					break;
					case Movie.CHILDRENS:
					thisAmount += 1.5;
					if (each.GetDaysRented () > 3)
						thisAmount += (each.GetDaysRented () - 3) * 1.5;
					break;
				}

				frequentRenterPoints++;

				if (each.GetMovie ().GetPriceCode () == Movie.NEW_RELEASE 
				    && each.GetDaysRented () > 1)
					frequentRenterPoints++;

				result += "\t" + each.GetMovie ().GetTitle () + "\t"
					+ thisAmount.ToString("0.0") + "\n";
				totalAmount += thisAmount;

			}

			result += "You owed " + totalAmount.ToString("0.0") + "\n";
			result += "You earned " + frequentRenterPoints + " frequent renter points\n";


			return result;
		}
	}
}

