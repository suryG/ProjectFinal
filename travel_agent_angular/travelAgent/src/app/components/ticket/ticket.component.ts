import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/flights.service';
import { user } from 'src/app/user';
import swal from 'sweetalert2';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(public flightS:FlightsService,public tickerRouter:Router) { }
detailsF:any;
pessanger:any;
userName:string="";
userLastName:string="";

pay(){
  swal.fire(
    'Payment successfull!',
    'Your order has been successfully placed!',
    'success'
  )
  this.tickerRouter.navigateByUrl('');
}
ngOnInit(): void {
  
    this.detailsF=this.flightS.myFlight;
    this.pessanger=sessionStorage.getItem('thisUser');
    this.userName=JSON.parse(this.pessanger).firstName;
    this.userLastName=JSON.parse(this.pessanger).lastName;


    



  }

}
