import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countries } from 'src/app/countries';
import { flightApi } from 'src/app/flight';
import { FlightsService } from 'src/app/flights.service';
import Swal from 'sweetalert2';
import { airlines } from 'src/app/airlines';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  constructor(private flightService: FlightsService, public rout: Router) { }
  lo: any;
  index: number = 0;
  access_token: string = '';
  open2: boolean = false;
  open4: boolean = false;

  callAirlinesNames() {
    this.access_token = this.flightService.accessTokenAirlinesNames;
    console.log(this.access_token + " layla");
    this.logi();
    var airCodes = this.flightService.myFlights.map(x => x.itineraries[1].segments[0].carrierCode);
    var codes = airCodes.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    for (let index = 0; index < codes.length; index++) {
      this.flightService.searchAirlineCode(codes[index], this.access_token)
        .subscribe(w => {
          this.lo = w.data[0];
          console.log(this.lo);
          for (let index1 = 0; index1 < this.flightService.myFlights.length; index1++) {
            if (this.flightService.myFlights[index1].itineraries[0].segments[0].carrierCode == codes[index]) {
              this.flightService.myFlights[index1].itineraries[0].segments[0].carrierCode = this.lo.commonName;
            }
            if (this.flightService.myFlights[index1].itineraries[1].segments[0].carrierCode == codes[index]) {
              this.flightService.myFlights[index1].itineraries[1].segments[0].carrierCode = this.lo.commonName;
            }

          }
          this.allFlights = this.flightService.myFlights;

          if (this.allFlights.length == 0) {
            console.log("lll")
            this.rout.navigateByUrl('flights');
            Swal.fire({
              title: 'Sorry',
              text: 'No flights were found in this search',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'O.K'
            })

          }
          console.log(this.allFlights);
          console.log(this.allFlights[0].itineraries[0].segments[0].carrierCode, this.access_token + " access token 111111111111=.component.ts")
          // for (this.index = 0; this.index < this.allFlights.length; this.index++) {
          //   this.flightService.searchAirlineCode(this.allFlights[this.index].itineraries[0].segments[0].carrierCode, this.access_token).subscribe(
          //     succ => { this.allFlights[this.index].itineraries[0].segments[0].carrierCode = succ });
          //   this.flightService.searchAirlineCode(this.allFlights[this.index].itineraries[1].segments[0].carrierCode, this.access_token).subscribe(
          //     succ => { this.allFlights[this.index].itineraries[1].segments[0].carrierCode = succ });
          // }
          console.log(this.allFlights);
          console.log(this.flightService.myFlights);
        });

      // this.flightService.codes.push()
    }
  }
  open() {
    this.open2 = !this.open2
  }
  open1() {
    this.open4 = !this.open4
  }
  choose(event: any) {
    if (sessionStorage.length > 0) {
      this.flightService.myFlight = event;
      this.rout.navigateByUrl('ticket');
      console.log(event);
    }
    else {
      Swal.fire({
        title: 'Oops',
        text: 'You must register first',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'O.K'

      })
    }
  }
  // myFlight:flight=new flight("","",new Date(),0,new Date());
  allFlights: flightApi[] = [];
  countryDepart: string = '';
  countryArrive: string = '';
  arrAirlinesNames: string[] = [];

  calculateDate() {


    for (let index = 0; index < this.allFlights.length; index++) {
      this.allFlights[index].itineraries[0].duration =
        this.allFlights[index].itineraries[0].duration.substring(2);
      this.allFlights[index].itineraries[1].duration =
        this.allFlights[index].itineraries[1].duration.substring(2);
      //     Number(this.allFlights[index].itineraries[1].duration.substring(2, 3)) < 10
      //       && Number(this.allFlights[index].itineraries[1].duration.substring(4, 5)) < 10 ? "0" +
      //       this.allFlights[index].itineraries[1].duration.substring(2, 3) + ":" + "0" + this.allFlights[index].itineraries[1].duration.substring(4, 5) :
      //       Number(this.allFlights[index].itineraries[1].duration.substring(2, 3)) < 10 ? "0" + this.allFlights[index].itineraries[1].duration.substring(2, 3) + ":" + this.allFlights[index].itineraries[1].duration.substring(4, 5) :
      //         this.allFlights[index].itineraries[1].duration.substring(2, 3) + ":" + "0" + this.allFlights[index].itineraries[1].duration.substring(4, 5)
    } //
  }




  ngOnInit(): void {
    this.logi();
    this.callAirlinesNames();

    if (this.flightService.myFlights.length == 0) {
      Swal.fire({
        title: 'Sorry',
        text: 'No flights were found in this search',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'O.K'
      })
    }
    this.countryDepart = this.flightService.DepartCountry;
    this.countryArrive = this.flightService.ArriveCountry;


    this.calculateDate();
  }
  logi() {
    this.flightService.loginTokenAmadeus('', '').subscribe(x => {
      this.access_token = x.access_token;
      console.log(this.access_token + "im acess token");
    });
  }
}
