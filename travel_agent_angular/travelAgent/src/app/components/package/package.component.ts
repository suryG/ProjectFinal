import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flightApi } from 'src/app/flight';
import { FlightsService } from 'src/app/flights.service';
import { Hotel, Result } from 'src/app/hotel';
import { HotelService } from 'src/app/hotel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  // flightToPackage: any[] = [];
  flightToPackageRes: any;
  hotelToPackageRes: any[] = [];
  // hotelToPackage: any[] = [];
  fromDate: Date = new Date();
  returnDate: Date = new Date();
  checkReviewsRating: any = 0;
  sl: number = 0;
  pic: any[] = [];
  countResults: number = 0;
  mypackage: any[] = [];
  threePackage: any[] = [];
  i: number = 0;
  currentNumberPackages: number = 0;



  constructor(public flightSer: FlightsService, public hotelSer: HotelService, public rout: Router) { }

  ngOnInit(): void {


    this.flightSer.packageFlightRes.subscribe(x => {
      this.flightToPackageRes = x;
      this.checkResults(1);
      this.rout.navigateByUrl('package');
      this.checkHotelOrFlight();
    });
    this.hotelSer.packageHotelsRes.subscribe(h => {
      this.hotelToPackageRes = h;
      this.checkResults(1);
      this.rout.navigateByUrl('package');
      console.log("ניתבתי מהוטל")

    });
    this.fromDate = this.hotelSer.fromDate;
    this.returnDate = this.hotelSer.returnDate;

  }

  checkguestReviewsRating(l: number) {
    try {
      this.checkReviewsRating = this.hotelToPackageRes[l].guestReviews.rating;
      return this.hotelToPackageRes[l].guestReviews.rating;
    }
    catch {
      this.checkReviewsRating = 0;
      return 0;
    }
  }
  ifDeals(l: number) {
    try {
      return this.hotelToPackageRes[l].deals.specialDeal.dealText;
    }
    catch {
      return "There are currently no suitable deals";
    }
  }
  isBadgeText(l: number) {
    try {
      return this.hotelToPackageRes[l].guestReviews.badgeText;
    }
    catch {
      return '';
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
  choosePackage() {
    Swal.fire({
      title: 'CHECK YOUR CHOISE',
      text: 'Are you confident in your decision?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        Swal.fire('ENJOY YOUR CHOISE');
        this.rout.navigateByUrl('home');
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('OK Please choose another:)');
      }
    })
  }
  finalPrice(l: number) {
    return (Number(this.flightToPackageRes[l].price.base)) + (Number(this.hotelToPackageRes[l].ratePlan.price.current.replace(",", "").substring(1)));
  }

  againToPackage() {
    this.rout.navigateByUrl('search-package');
  }
  checkResults(number: number) {
    this.countResults += number;
    if (this.countResults == 2) {
      this.checkHotelOrFlight();
      if (this.flightToPackageRes == undefined || this.hotelToPackageRes == undefined) {
        Swal.fire({
          title: 'SORRRY.. WE DONT HAVE A PACKAGE FOR YOU:(',
          text: 'TRY AGAIN',
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'O.K'
        })
        this.rout.navigateByUrl('search-package');
      }
    }
  }
  checkHotelOrFlight() {
    if (this.flightToPackageRes.length > this.hotelToPackageRes.length) {
      this.mypackage = this.hotelToPackageRes;
    }
    else {
      this.mypackage = this.flightToPackageRes;
    }
    if (this.mypackage.length > 3) {
      this.currentNumberPackages = 3
    }
    else {
      this.currentNumberPackages = this.mypackage.length;
    }
    for (this.i = 0; this.i < this.currentNumberPackages; this.i++) {
      this.threePackage[this.i] = this.mypackage[this.i];
    }
    return this.threePackage;
  }

  viewMore() {
    return this.threePackage = this.mypackage;
  }
}
