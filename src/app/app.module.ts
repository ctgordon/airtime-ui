import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpService} from "./services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {AircraftComponent} from './components/aircraft/aircraft.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {environment} from "../environments/environment";
import {AirportsComponent} from './components/airports/airports.component';
import {PeopleComponent} from './components/people/people.component';
import {AircraftTypesComponent} from './components/aircraft-types/aircraft-types.component';
import {TableComponent} from './elements/table/table.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {EditAircraftModalComponent} from "./dialogs/edit-aircraft-modal/edit-aircraft-modal.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FlightsComponent} from './components/flights/flights.component';
import {ValidatedDropdownComponent} from './elements/validated-dropdown/validated-dropdown.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatTabsModule} from "@angular/material/tabs";
import { GoogleSheetsImportComponent } from './components/google-sheets-import/google-sheets-import.component';
import { FlightSummaryComponent } from './components/flight-summary/flight-summary.component';
import { CustomReportsComponent } from './components/custom-reports/custom-reports.component';

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
    ValidatedDropdownComponent,
    ConfirmDialogComponent,
    GoogleSheetsImportComponent,
    FlightSummaryComponent,
    CustomReportsComponent,
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
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [
    HttpService,
    {provide: APP_BASE_HREF, useValue: environment.baseHref},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
