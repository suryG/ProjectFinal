import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { flightApi } from './flight';
import { countries } from './countries';
import { Hotel } from './hotel';
// import flights from './flight';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }


  allCountries(): Observable<countries[]> {
    return this.http.get<countries[]>("http://localhost:52473/country/getAllCountries");
  }
  loginTokenAmadeus(apiKey: string, apiSecret: string) {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', 'lfGwlKzrHyIgSOfLG3fqWQl6wjjlaHA9')
                       /*lfGwlKzrHyIgSOfLG3fqWQl6wjjlaHA9*/ 
      .set('client_secret', 'zgmkq70RkjIYmri2');
                           /*zgmkq70RkjIYmri2*/ 

    return this.http.post<any>('https://test.api.amadeus.com/v1/security/oauth2/token',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }
  DepartCountry: string = '';
  ArriveCountry: string = '';
  countriesArray: countries[] = [];
  myFlights: any[] = [];
  myFlight: any;
  accessTokenAirlinesNames: string = '';
  packageFlight: flightApi[] = [];
  packageFlightRes = new Subject<flightApi>();

  searchFlights(originLocationCode: string, destinationLocationCode: string, departureDate: string, adults: string, tokenAccess: string, returnDate: string, ifreturn: Boolean) {
    var url = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=" + originLocationCode +
      "&destinationLocationCode=" + destinationLocationCode +
      "&departureDate=" + departureDate + "&adults=" + adults + "&nonStop=true" + "&currencyCode=USD";
    ;
    if (ifreturn == true) {
      url = url + "&returnDate=" + returnDate;
    }
    return this.http.get<any>(url,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${tokenAccess}`)
      });

  }

  searchAirlineCode(airlineCodes: string, tokenAccess: string) {
    console.log(airlineCodes + "airlineCodes  " + tokenAccess + "tokenAccess");
    var url = "https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=" + airlineCodes;
    return this.http.get<any>(url,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${tokenAccess}`)
      });
  }
}

