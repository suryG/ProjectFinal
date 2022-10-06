import { Component, destroyPlatform, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countries } from 'src/app/countries';
import { FlightsService } from 'src/app/flights.service';
import { HotelService } from 'src/app/hotel.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-search-package',
  templateUrl: './search-package.component.html',
  styleUrls: ['./search-package.component.css']
})
export class SearchPackageComponent implements OnInit {
  passengerArr: any[] = ['1', '2', '3', '4', '5', '6'];
  sortByArr: any[] = ["STAR_RATING_HIGHEST_FIRST", "GUEST_RATING", "PRICE_HIGHEST_FIRST", "PRICE"];
  access_token: string = '';
  public iataCodeDepartCountry: any = '';
  public iataCodeArriveCountry: any = '';
  arrCountries: countries[] = [];
  destCityList: any[] = [];
  fromDate: Date = new Date();
  returnDate: Date = new Date();
  countryFromArray: countries[] = [];
  countryToArray: countries[] = [];


  constructor(public flightService: FlightsService, public hotelService: HotelService, public rout: Router) { }

  ngOnInit(): void {
    this.logi();
    this.callCountries();
  }
  callCountries() {
    this.flightService.allCountries().subscribe(succ => {
      this.arrCountries = succ;
      this.countryToArray = succ;
      this.countryFromArray = succ;
      this.flightService.countriesArray = succ;

    });
  }
  logi() {
    this.flightService.loginTokenAmadeus('', '').subscribe(x => {
      this.access_token = x.access_token;
    });
  }
  checkCountryTo(countryFrom: string) {//israel
    this.countryToArray = this.arrCountries.filter(x => x.countryDisplayName != countryFrom);
    return this.countryToArray;
  }
  checkCountryFrom(countryTo: string) {//israel
    this.countryFromArray = this.arrCountries.filter(x => x.countryDisplayName != countryTo);
    this.hotelService.searchDestByCountry(countryTo).subscribe(x => {
      console.log(x);
      this.destCityList = x.suggestions[0].entities;
      console.log("from check country from");
      console.log(this.destCityList);
      return this.countryFromArray;

    });

  }
  searchPackage(countryFrom: string, countryTo: string, city: string, departDate: string, returnDate: string, passengers: string, sortBy: string) {
    this.fromDate = new Date(departDate);
    this.returnDate = new Date(returnDate);
    this.hotelService.fromDate = this.fromDate;
    this.hotelService.returnDate = this.returnDate;;
    if (countryFrom == "" || countryTo == "" || city == "" || departDate == "" || returnDate == "" || passengers == "" || sortBy == "") {
      Swal.fire({
        title: 'Warning',
        text: 'All data must be filled out',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (this.fromDate < new Date() || this.returnDate < new Date()) {
      Swal.fire({
        title: 'The dates are incorrect',
        text: 'Please enter dates from the current day',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (this.returnDate < this.fromDate) {
      Swal.fire({
        title: 'The dates are incorrect',
        text: 'Return flight date should be after the flight round trip date',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }/*🛌 🕶 🏖*/
    else {
      this.flightService.accessTokenAirlinesNames = this.access_token;
      this.iataCodeDepartCountry = this.arrCountries.find(x => x?.countryDisplayName === countryFrom)?.countryKey.toString();
      this.iataCodeArriveCountry = this.arrCountries.find(x => x?.countryDisplayName === countryTo)?.countryKey.toString();
      this.flightService.searchFlights(this.iataCodeDepartCountry,
        this.iataCodeArriveCountry, departDate, passengers,
        this.access_token, returnDate, true).subscribe(x => {
          // this.flightService.packageFlight = x.data;
          this.flightService.packageFlightRes.next(x.data);
        });

      try {
        var destId = this.destCityList.filter(x => x.name === city)[0].destinationId;
        console.log(destId);
        this.hotelService.searchHotelsByDest(destId, departDate, returnDate, '1', sortBy)
          .subscribe(x => {
            this.hotelService.packageHotelsRes.next(x.searchResults.results);

          });
        this.rout.navigateByUrl('package');//העברה לדף חבילה 
      }
      catch {
        Swal.fire({
          title: 'You have made invalid changes to the clipboard',
          text: 'Something wrong with your city',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'O.K'
        })
      }
    }

  }
 
}






