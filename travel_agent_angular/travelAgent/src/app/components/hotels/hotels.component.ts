import { Component, OnInit } from '@angular/core';
import { Hotel, Result } from 'src/app/hotel';
import { HotelService } from 'src/app/hotel.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotelArray: any;
  resultsOfHotels: any[] = [];
  arrHotelLength: number = 0;
  pic: any[] = [];
  ratePic: any[] = [];
  fromDate: Date = new Date();
  returnDate: Date = new Date();
  sl: number = 0;
  checkReviewsRating: any = 0;
  people: any;
  nights: any;




  // starNumbersArray:any[]=[this.resultsOfHotels[0].starRating];
  // starArray:any[]=['⭐','⭐','⭐','⭐','⭐'];
  constructor(public hotelSer: HotelService, public rout: Router) { }

  ngOnInit(): void {
    this.people = this.hotelSer.people;
    this.nights = this.hotelSer.nights;
    console.log(this.nights);
    this.fromDate = this.hotelSer.fromDate;
    this.returnDate = this.hotelSer.returnDate;
    this.hotelArray = this.hotelSer.searchHotels;
    this.callHotelResults();
    console.log(this.resultsOfHotels);
    for (let index = 0; index < this.resultsOfHotels.length; index++) {
      console.log("ss" + this.resultsOfHotels[index].starRating);
      // this.resultsOfHotels[index].starRating = this.level(Math.floor(this.resultsOfHotels[index].starRating));
    }
    if (this.hotelArray.length == 0) {
      Swal.fire({
        title: 'Sorry',
        text: 'No Hotels were found in this search',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
  }
  callHotelResults() {
    this.arrHotelLength = this.hotelArray.searchResults.results.length;
    for (let index = 0; index < this.arrHotelLength; index++) {
      this.resultsOfHotels.push(this.hotelArray.searchResults.results[index]);
    }
  }
  chooseHotel(choosenHotel: Result) {
    this.hotelSer.hotelChoosen = choosenHotel;
    this.rout.navigateByUrl('hotel-ticket');
  }
  checkguestReviewsRating(hotel: Result) {
    try {
      this.checkReviewsRating = hotel.guestReviews.rating;
      return hotel.guestReviews.rating;
    }
    catch {
      this.checkReviewsRating = 0;
      return 0;
    }

  }
  level(l: number) {
    this.sl = Math.floor(l);
    for (let i = 0; i < this.sl; i++) {
      this.pic[i] = '⭐';
    }
    for (let i = this.sl; i < 5; i++) {
      this.pic[i] = '✩';
    }
    return this.pic;
  }
  ratingUsers() {//3.5
    this.sl = Math.floor(this.checkReviewsRating);//3
    for (let i = 0; i < this.sl; i++) {
      this.ratePic[i] = '⬤';
    }
    if (this.checkReviewsRating > this.sl) {
      this.ratePic[this.sl] = '◐';
      for (let i = this.sl + 1; i < 5; i++) {
        this.ratePic[i] = '〇';
      }
    }
    else {
      for (let i = this.sl; i < 5; i++) {
        this.ratePic[i] = '〇';
      }
    }
    return this.ratePic;
  }
  ifDeals(hotel: Result) {
    try {
      return hotel.deals.specialDeal.dealText;
    }
    catch {
      return "There are currently no suitable deals";
    }
  }
  isBadgeText(hotel: Result) {
    try {
      return hotel.guestReviews.badgeText;
    }
    catch {
      return '';
    }

  }

}
