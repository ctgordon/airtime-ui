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
import { TableComponent } from './elements/table/table.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {EditAircraftModalComponent} from "./dialogs/edit-aircraft-modal/edit-aircraft-modal.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FlightsComponent } from './components/flights/flights.component';
import { ValidatedDropdownComponent } from './elements/validated-dropdown/validated-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    AircraftComponent,
    HomeComponent,
    AirportsComponent,
    PeopleComponent,
    AircraftTypesComponent,
    TableComponent,
    EditAircraftModalComponent,
    FlightsComponent,
    ValidatedDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [
    HttpService,
    {provide: APP_BASE_HREF, useValue: environment.baseHref},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
