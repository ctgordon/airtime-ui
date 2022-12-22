import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AircraftComponent} from "./components/aircraft/aircraft.component";
import {HomeComponent} from "./components/home/home.component";
import {AirportsComponent} from "./components/airports/airports.component";
import {PeopleComponent} from "./components/people/people.component";
import {AircraftTypesComponent} from "./components/aircraft-types/aircraft-types.component";
import {FlightsComponent} from "./components/flights/flights.component";
import {GoogleSheetsImportComponent} from "./components/google-sheets-import/google-sheets-import.component";
import {CustomReportsComponent} from "./components/custom-reports/custom-reports.component";
import {ReportTypesComponent} from "./components/report-types/report-types.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'flights',
    component: FlightsComponent,
    pathMatch: 'full'
  },
  {
    path: 'aircraft',
    component: AircraftComponent,
    pathMatch: 'full'
  },
  {
    path: 'airports',
    component: AirportsComponent,
    pathMatch: 'full'
  },
  {
    path: 'aircraft-types',
    component: AircraftTypesComponent,
    pathMatch: 'full'
  },
  {
    path: 'people',
    component: PeopleComponent,
    pathMatch: 'full'
  },
  {
    path: 'import',
    component: GoogleSheetsImportComponent,
    pathMatch: 'full'
  },
  {
    path: 'reports',
    component: CustomReportsComponent,
    pathMatch: 'full'
  },
  {
    path: 'report-types',
    component: ReportTypesComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
