import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { user } from './user';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isSessionStorage: boolean = false;
  userLogin = new Subject<user>();
  constructor(private http: HttpClient) { }
  allUser(): Observable<user[]> {
    return this.http.get<user[]>("http://localhost:52473/useri/getAllUsers");
  }
  checkInUser(name: string, password: string): Observable<number> {
    console.log(name + " name from service" + password + " pass from service");
    return this.http.get<number>("http://localhost:52473/useri/checkLogin?name=" + name + "&pass=" + password);
  }
  addUser(u: user): Observable<number> {
    return this.http.post<number>("http://localhost:52473/useri/addNewUser", u);
  }
  isRegistered(tz: string): Observable<number> {
    return this.http.get<number>("http://localhost:52473/useri/isRegistered?tz=" + tz);
  }
}
//`${environment.port_url}useri/getAllUsers`
 // `${environment.port_url}useri/checkLogin?name=${name}&pass=${password}`
 //`${environment.port_url}`+"useri/addNewUser",u
 //`${environment.port_url}useri/isRegistered?tz=${tz}`
