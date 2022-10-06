import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FlightsSearchComponent } from './components/flights-search/flights-search.component';
import { HotelsSearchComponent } from './components/hotels-search/hotels-search.component';
import { PackageComponent } from './components/package/package.component';
import { FlightComponent } from './components/flight/flight.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { SearchPackageComponent } from './components/search-package/search-package.component';
import { TicketHotelComponent } from './components/ticket-hotel/ticket-hotel.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hotels', component: HotelsSearchComponent },
  { path: 'flights', component: FlightsSearchComponent },
  { path: 'search-package', component: SearchPackageComponent },
  { path: 'package', component: PackageComponent },
  { path: 'flight', component: FlightComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'log-out', component: LogoutComponent },
  { path: 'hotel', component: HotelsComponent },
  { path: 'hotel-ticket', component: TicketHotelComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
