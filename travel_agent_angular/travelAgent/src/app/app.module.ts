import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelsSearchComponent } from './components/hotels-search/hotels-search.component';
import { FlightsSearchComponent } from './components/flights-search/flights-search.component';
import { PackageComponent } from './components/package/package.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlightComponent } from './components/flight/flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import { ThinkerComponent } from './components/thinker/thinker.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { SearchPackageComponent } from './components/search-package/search-package.component';
import { TicketHotelComponent } from './components/ticket-hotel/ticket-hotel.component';
import { HomeComponent } from './components/home/home.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HotelsComponent,
    HotelsSearchComponent,
    FlightsSearchComponent,
    PackageComponent,
    FooterComponent,
    FlightComponent,
    LogoutComponent,
    ThinkerComponent,
    TicketComponent,
    SearchPackageComponent,
    TicketHotelComponent,
    HomeComponent,
    // NgbModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
