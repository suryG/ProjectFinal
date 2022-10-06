import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public rout: Router, public userSer: UserService) { }
  public isSessionStorage: boolean = false;
  ngOnInit(): void {
    this.logOut();
  }
  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to disconnect from the system',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.value) {
        Swal.fire('The disengagement was successful');
        sessionStorage.setItem("thisUser",'null');
        this.userSer.userLogin.next(undefined);
        this.isSessionStorage = this.userSer.isSessionStorage = false;
        this.rout.navigateByUrl('login');
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(':) THANK YOU'); 
        this.isSessionStorage = this.userSer.isSessionStorage = false;

      }
    })
  }
}


