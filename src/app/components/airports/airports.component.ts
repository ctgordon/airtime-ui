import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {Airport} from "../../model/airport";
import {TableConfig} from "../../model/table.config";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit, OnDestroy {

  public airportList!: Airport[];
  public tableConfig: TableConfig = {
    data: [],
    headers: ['Country name', 'Country code', 'Airport name', 'Airport code', 'City', 'Lat', 'Long'],
    editable: true,
  };

  private subscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAirports();
  }

  getAirports() {
    this.subscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/airports/`).subscribe({
      next: (v) => {
        this.airportList = v;

        this.tableConfig.data = [];

        this.airportList.forEach(airport => {
          this.tableConfig.data.push([airport.countryName, airport.countryCode, airport.airportName, airport.airportCode, airport.cityName, airport.latitude, airport.longitude]);
        });
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
