import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countries } from 'src/app/countries';
import { HotelService } from 'src/app/hotel.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hotels-search',
  templateUrl: './hotels-search.component.html',
  styleUrls: ['./hotels-search.component.css']
})
export class HotelsSearchComponent implements OnInit {

  constructor(private hotelsService: HotelService, public rout: Router) { }

  // "Mail": new FormControl("",Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
  destCityList: any[] = [];
  arrCountries: countries[] = [];
  CheckIn: Date = new Date();
  CheckOut: Date = new Date();
  checking: boolean = true;
  numbers: any[] = [1, 2, 3, 4, 5];
  people: any;
  nights: any;
  totalNights: any;
  time: any;


  ngOnInit(): void {
    this.arrCountries = this.hotelsService.countriesArray;
    this.callCountries();

  }
  callCountries() {
    this.hotelsService.allCountries().subscribe(succ => {
      this.arrCountries = succ
      this.hotelsService.countriesArray = succ;
    });
  }
  onSelectCountry(countryName: string) {
    this.hotelsService.searchDestByCountry(countryName).subscribe(x => {
      console.log(x);
      this.destCityList = x.suggestions[0].entities;
      console.log(this.destCityList);
    });
  }
  bookNow(Country: string, City: string, CheckIn: string, CheckOut: string, NumberRooms: string, NumberAdults: string, NumberChildren: string, Email: string, Phone: string) {

    this.checking = this.arrCountries.map(x => x.countryDisplayName === Country).length != 1;
    this.CheckIn = new Date(CheckIn);
    this.CheckOut = new Date(CheckOut);
    this.hotelsService.fromDate = this.CheckIn;
    this.hotelsService.returnDate = this.CheckOut;
    this.people = Number(NumberAdults) + Number(NumberChildren);
    this.hotelsService.people = this.people;

    this.time = this.hotelsService.returnDate.getTime() - this.hotelsService.fromDate.getTime();
    this.totalNights = this.time / (1000 * 3600 * 24);
    this.hotelsService.nights = this.totalNights;

    if (City == "" || CheckIn == "" || CheckOut == "" || NumberRooms == "" || NumberAdults == "" || Email == "" || Phone == "") {
      Swal.fire({
        title: 'Worning',
        text: 'All data must be filled out',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (this.arrCountries.filter(x => x.countryDisplayName === Country).length != 1) {
      Swal.fire({
        title: 'Error',
        text: 'Did you choose a country from the list?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (Email.search('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
      Swal.fire({
        title: 'Incorrect email address',
        text: 'Please enter a valid email address',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (this.CheckIn < new Date() || this.CheckOut < new Date()) {
      Swal.fire({
        title: 'The dates are incorrect',
        text: 'Please enter dates from the current day',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else if (this.CheckOut < this.CheckIn) {
      Swal.fire({
        title: 'The dates are incorrect',
        text: 'Checkout date should be after the CheckIn date',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    else {
      try {
        var destId = this.destCityList.filter(x => x.name === City)[0].destinationId;
        this.hotelsService.searchHotelsByDest(destId, CheckIn, CheckOut, NumberRooms)
          .subscribe(x => {
            this.hotelsService.searchHotels = x;
            console.log(this.hotelsService.searchHotels);
            console.log(x);
            this.rout.navigateByUrl('hotel');
          });
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
