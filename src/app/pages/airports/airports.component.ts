import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {Airport} from "../../model/airport";
import {TableConfig} from "../../model/table.config";
import {AirportInfo} from "../../model/airport.info";
import {AircraftType} from "../../model/aircraftType";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit, OnDestroy {

  public airportList!: Airport[];
  public loading: boolean = false;

  public displayedColumns = [
    {id: 'countryName', title: 'Country name'},
    {id: 'countryCode', title: 'Country code'},
    {id: 'airportName', title: 'Airport name'},
    {id: 'airportCode', title: 'Airport code'},
    {id: 'cityName', title: 'City name'},
    {id: 'latitude', title: 'Latitude'},
    {id: 'longitude', title: 'Longitude'},
  ];
  public dataSource!: MatTableDataSource<Airport>;

  private subscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAirports();
  }

  getAirports() {
    this.loading = true;
    this.subscription = this.httpService.getAirports().subscribe({
      next: airports => {
        this.airportList = airports;

        this.loading = false;

        this.dataSource = new MatTableDataSource(this.airportList);
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
      complete: () => {
      }
    });
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
  }
}
