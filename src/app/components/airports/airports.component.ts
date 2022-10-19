import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {Airport} from "../../model/airport";
import {TableConfig} from "../../model/table.config";
import {AirportInfo} from "../../model/airport.info";
import {AircraftType} from "../../model/aircraftType";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit, OnDestroy {

  public airportList!: Airport[];
  public airportInfo!: AirportInfo;
  public tableConfig: TableConfig = {
    data: [],
    headers: ['Country name', 'Country code', 'Airport name', 'Airport code', 'City', 'Lat', 'Long'],
    editable: true,
  };
  public loading: boolean = false;

  private subscription!: Subscription;
  private airportInfoSubscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    // this.getAirportInfo();
    this.getAirports();
  }

  getAirports() {
    this.loading = true;
    this.subscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/airports/`).subscribe({
      next: (v) => {
        this.airportList = v;

        this.tableConfig.data = [];

        this.airportList.forEach(airport => {
          this.tableConfig.data.push({
            obj: airport,
            values: [airport.countryName, airport.countryCode, airport.airportName, airport.airportCode, airport.cityName, airport.latitude, airport.longitude]
          });
        });
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
      complete: () => {
      }
    });
  }

  getAirportInfo() {
    const airportCode = 'KSEE';
    const filtered = this.airportList.filter(it => it.airportCode === airportCode);
    if (!filtered.length) {
      this.airportInfoSubscription = this.httpService.getAirportInfo(airportCode).subscribe({
        next: (airportInfo: AirportInfo) => {
          if (airportInfo) {
            console.log(airportInfo);
            const airport: Airport = {
              airportCode: airportInfo.icao,
              airportName: airportInfo.name,
              cityName: airportInfo.county,
              countryCode: airportInfo.country_iso,
              countryName: airportInfo.country,
              id: 0,
              latitude: airportInfo.latitude,
              longitude: airportInfo.longitude
            };
            this.save(airport);
          }
        },
        error: err => {
          console.error(err);
        },
        complete: () => {
        }
      });
    } else {
      window.alert(`${airportCode} already exists`);
    }
  }

  save(airport: Airport) {
    this.loading = true;

    console.log(airport);

    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/airport/`, airport).subscribe({
      next: (v) => {
        console.log(v);
        this.getAirports();
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        console.log('Getting here');
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.subscription !== 'undefined') {
      this.subscription.unsubscribe();
    }
    if (typeof this.airportInfoSubscription !== 'undefined') {
      this.airportInfoSubscription.unsubscribe();
    }
  }
}
