import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AircraftComponent} from "./pages/aircraft/aircraft.component";
import {HomeComponent} from "./pages/home/home.component";
import {AirportsComponent} from "./pages/airports/airports.component";
import {PeopleComponent} from "./pages/people/people.component";
import {AircraftTypesComponent} from "./pages/aircraft-types/aircraft-types.component";
import {FlightsComponent} from "./pages/flights/flights.component";
import {GoogleSheetsImportComponent} from "./pages/google-sheets-import/google-sheets-import.component";
import {CustomReportsComponent} from "./pages/custom-reports/custom-reports.component";
import {ReportTypesComponent} from "./pages/report-types/report-types.component";

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
