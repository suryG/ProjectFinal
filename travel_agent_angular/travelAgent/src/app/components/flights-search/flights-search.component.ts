import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { airlines } from 'src/app/airlines';
import { countries } from 'src/app/countries';
import { FlightsService } from 'src/app/flights.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
  styleUrls: ['./flights-search.component.css']
})
export class FlightsSearchComponent implements OnInit {
  constructor(public rout: Router, private flightService: FlightsService) { }
  access_token = '';
  arrCountries: countries[] = [];
  public country: any = '';
  public arrive: any = '';
  public iataCodeDepartCountry: any = '';
  public iataCodeArriveCountry: any = '';
  arrAirlinesFullNames: airlines[] = [];
  countryFromArray: countries[] = [];
  countryToArray: countries[] = [];
  // selectCountryKey(ck: any) {
  //   this.country = ck;
  //   console.log(this.country + " from selectCountryKey");
  // }

  ngOnInit(): void {
    this.logi();
    this.arrCountries = this.flightService.countriesArray;
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
      console.log(this.access_token + " at from logi");
    });
  }
  checkCountryTo(countryFrom: string) {//israel
    this.countryToArray = this.arrCountries.filter(x => x.countryDisplayName != countryFrom);
    return this.countryToArray;
  }
  checkCountryFrom(countryTo: string) {//israel
    this.countryFromArray = this.arrCountries.filter(x => x.countryDisplayName != countryTo);
    return this.countryFromArray;
  }

  DepartDate: Date = new Date();
  returnDate: Date = new Date();
  search(Depart: string, Arrive: string, DepartDate: string, passengers: string, returnDate: string, ifreturn: Boolean) {
    this.flightService.DepartCountry = Depart;
    this.flightService.ArriveCountry = Arrive;
    this.DepartDate = new Date(DepartDate);
    this.returnDate = new Date(returnDate);
    if (Depart == "" || Arrive == "" || DepartDate == "" || passengers == "") {
      Swal.fire({
        title: 'Worning',
        text: 'All data must be filled out',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (ifreturn == true && returnDate == "") {
      Swal.fire({
        title: 'Attention',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (this.DepartDate < new Date() || this.returnDate < new Date()) {
      Swal.fire({
        title: 'The dates are incorrect',
        text: 'Please enter dates from the current day',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (this.returnDate < this.DepartDate) {
      Swal.fire({
        title: 'The dates are incorrect',
        text: 'Return flight date should be after the flight round trip date',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }

    else {
      this.flightService.accessTokenAirlinesNames=this.access_token;
      this.iataCodeDepartCountry = this.arrCountries.find(x => x?.countryDisplayName === Depart)?.countryKey.toString();
      console.log(this.iataCodeDepartCountry);
     

      this.iataCodeArriveCountry = this.arrCountries.find(x => x?.countryDisplayName === Arrive)?.countryKey.toString();
       console.log(this.iataCodeArriveCountry);this.flightService.searchFlights(this.iataCodeDepartCountry,
        this.iataCodeArriveCountry, DepartDate, passengers,
        this.access_token, returnDate, ifreturn).subscribe(x => {
          console.log(x);
          this.flightService.myFlights = x.data;
          this.rout.navigateByUrl('flight');//העברה לדף אופציות טיסה
        });

    }
  }
}
