import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpService} from "./services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import { AircraftComponent } from './components/aircraft/aircraft.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {environment} from "../environments/environment";
import { AirportsComponent } from './components/airports/airports.component';
import { PeopleComponent } from './components/people/people.component';
import { AircraftTypesComponent } from './components/aircraft-types/aircraft-types.component';

@NgModule({
  declarations: [
    AppComponent,
    AircraftComponent,
    HomeComponent,
    AirportsComponent,
    PeopleComponent,
    AircraftTypesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    HttpService,
    {provide: APP_BASE_HREF, useValue: environment.baseHref}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
