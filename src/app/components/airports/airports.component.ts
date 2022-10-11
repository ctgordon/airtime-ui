import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {Airport} from "../../model/airport";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit, OnDestroy {

  public airportList!: Airport[];

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
