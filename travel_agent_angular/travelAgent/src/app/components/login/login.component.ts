import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { user } from '../../user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  constructor(public active: ActivatedRoute, public ser: UserService, public rout: Router) {
    this.ser.allUser().subscribe(succ => this.list = succ);
  }

  public userList: user[] = [];
  public list: user[] = []
  public errorLogIn = '';
  checkUser: user = new user('null', 'null', 'null', 'null', 'null');
  myUser: user = new user('null', 'null', 'null', 'null', 'null');
  isSessionStorage: boolean = false;
  ngOnInit(): void {
    this.allUser();
  }
  ngAfterViewChecked() {
    this.isSessionStorage = this.ser.isSessionStorage;
  }
  allUser() {
    const allUserList = this.ser.allUser().subscribe(succ => {
      this.userList = succ;
      console.log(this.userList);
    });
  }
  // callWindowLocation(){
  //   return window.location.href = "http://localhost:4200";
  // }
  connection(userName: string, password: string) {
    if (userName != null && password != null) {
      this.ser.checkInUser(userName, password).subscribe((succ) => {
        if (succ == 0) {
          Swal.fire("Incorrect password,Please try again");
        }
        if (succ == 1) {
          Swal.fire("You are not registered yet");
        }
        if (succ == 2) {
          Swal.fire("Hi" + "  " + userName);
          for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].pasword == password) {
              this.myUser = this.list[i];
            }
            this.rout.navigateByUrl('home');
          }
          sessionStorage.setItem("thisUser", JSON.stringify(this.myUser));
          this.ser.userLogin.next(this.myUser);
          this.rout.navigateByUrl('flights');
          console.log(this.userList);
          console.log(this.myUser);
        }
      });
    }
    else {
      Swal.fire("Details must be filled out");
    }
  }
  addToList(newUserReg: user) {
    this.ser.addUser(newUserReg).subscribe(succ => newUserReg);
    sessionStorage.setItem("thisUser", JSON.stringify(newUserReg));
  }
  isRegistered(tzRegister: any, firstName: any, lastName: any, passwordRegister: any, repeatPassword: any, emailRegister: any) {
    if (tzRegister.length != 9) {
      Swal.fire("Not correct user ID");
    }
    else if (tzRegister == "" || firstName == "" || lastName == "" || passwordRegister == "" || repeatPassword == "" || emailRegister == "") {
      Swal.fire("One or more of the details are missing");
    }
    else if (repeatPassword != passwordRegister) {
      Swal.fire("Verify password");
    }
    else {
      console.log(tzRegister);
      this.ser.isRegistered(tzRegister).subscribe((succ) => {
        if (succ == 2) {
          Swal.fire("You are already registered in the system ");
          this.rout.navigateByUrl('login');
        }
        if (succ == 0) {//אינו רשום ומכניסו למערכת
          this.checkUser = new user(tzRegister, firstName, lastName, passwordRegister, emailRegister);
          this.addToList(this.checkUser);
          this.allUser();
          this.ser.isSessionStorage = true;
          this.rout.navigateByUrl('home');
        }
      });
    }
  }
}


