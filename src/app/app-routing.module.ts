import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AircraftComponent} from "./components/aircraft/aircraft.component";
import {HomeComponent} from "./components/home/home.component";
import {AirportsComponent} from "./components/airports/airports.component";
import {PeopleComponent} from "./components/people/people.component";
import {AircraftTypesComponent} from "./components/aircraft-types/aircraft-types.component";
import {FlightsComponent} from "./components/flights/flights.component";

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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
