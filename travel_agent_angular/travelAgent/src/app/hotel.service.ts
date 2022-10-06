import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { countries } from './countries';
import { Hotel, Result } from './hotel';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  KEY_HOTELS = environment.keyHotels;
  DEST_URL = "https://hotels-com-provider.p.rapidapi.com/v1/destinations/search";
  SEARCH_URL = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search";
  searchHotels: any;
  countriesArray: countries[] = [];
  packageHotel: any[] = [];
  fromDate: Date = new Date();
  returnDate: Date = new Date();
  hotelChoosen: any;
  people: any;
  nights: any;
  packageHotelsRes = new Subject<Result[]>();



  constructor(private http: HttpClient) { }

  allCountries(): Observable<countries[]> {
    return this.http.get<countries[]>("http://localhost:52473/country/getAllCountries");
  }
  searchHotelsByDest(destId: any, CheckIn: string, CheckOut: string, adults_number: string, sort_order = 'STAR_RATING_HIGHEST_FIRST') {
    var apiUrl = this.SEARCH_URL + "?checkin_date=" + CheckIn + "&checkout_date=" + CheckOut + "&sort_order=" + sort_order + "&destination_id="
      + destId + "&adults_number=" + adults_number + "&locale=en_US&currency=USD";
    return this.http.get<any>(apiUrl,
      {
        headers: new HttpHeaders()
          .set('x-rapidapi-host', `hotels-com-provider.p.rapidapi.com`)
          .set('x-rapidapi-key', this.KEY_HOTELS)
      });
  }
  searchDestByCountry(country: string) {
    var apiUrl = this.DEST_URL + "?query=" + country +
      "&currency=USD&locale=en_US";
    return this.http.get<any>(apiUrl,
      {
        headers: new HttpHeaders()
          .set('x-rapidapi-host', `hotels-com-provider.p.rapidapi.com`)
          .set('x-rapidapi-key', this.KEY_HOTELS)
      });
  }
}
