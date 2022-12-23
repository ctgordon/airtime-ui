import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpService} from "./services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AircraftComponent} from './pages/aircraft/aircraft.component';
import {HomeComponent} from './pages/home/home.component';
import {RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {environment} from "../environments/environment";
import {AirportsComponent} from './pages/airports/airports.component';
import {PeopleComponent} from './pages/people/people.component';
import {AircraftTypesComponent} from './pages/aircraft-types/aircraft-types.component';
import {TableComponent} from './components/table/table.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FlightsComponent} from './pages/flights/flights.component';
import {ValidatedDropdownComponent} from './components/validated-dropdown/validated-dropdown.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from './dialogs/confirm-dialog/confirm-dialog.component';
import {MatTabsModule} from "@angular/material/tabs";
import {GoogleSheetsImportComponent} from './pages/google-sheets-import/google-sheets-import.component';
import {FlightSummaryComponent} from './components/flight-summary/flight-summary.component';
import {CustomReportsComponent} from './pages/custom-reports/custom-reports.component';
import {MatSelectModule} from "@angular/material/select";
import {ValidatedInputComponent} from './components/validated-input/validated-input.component';
import {ReportTypesComponent} from './pages/report-types/report-types.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { SwitchComponent } from './components/switch/switch.component';
import { GenericFormComponent } from './dialogs/generic-form/generic-form.component';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    AircraftComponent,
    HomeComponent,
    AirportsComponent,
    PeopleComponent,
    AircraftTypesComponent,
    TableComponent,
    FlightsComponent,
    ValidatedDropdownComponent,
    ConfirmDialogComponent,
    GoogleSheetsImportComponent,
    FlightSummaryComponent,
    CustomReportsComponent,
    ValidatedInputComponent,
    ReportTypesComponent,
    SwitchComponent,
    GenericFormComponent,
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
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    HttpService,
    {provide: APP_BASE_HREF, useValue: environment.baseHref},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
