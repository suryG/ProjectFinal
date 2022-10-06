import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { user } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user!: user;
  constructor(public userSer: UserService) { }
  //isSessionStorage: boolean = true;

  ngOnInit(): void {
    var getUser = sessionStorage.getItem("thisUser");
    if (getUser != null) {
      this.user = <user>JSON.parse(getUser);
    }
    this.userSer.userLogin.subscribe(x=>{
      this.user = x;
    });
  }
  /*ngAfterViewChecked(): void {
    this.isSessionStorage = this.userSer.isSessionStorage;
    console.log("from AfterViewChecked");
    console.log(this.isSessionStorage);
// sessionStorage.setItem("thisUser"
  }*/



}
