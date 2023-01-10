import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Flight} from "../../model/flight";
import {Subscription} from "rxjs";
import * as moment from "moment";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-latest-flight',
  templateUrl: './latest-flight.component.html',
  styleUrls: ['./latest-flight.component.scss']
})
export class LatestFlightComponent implements OnInit, OnDestroy {

  public flight !: Flight;
  public loading !: boolean;
  public duration !: number;
  public weeksSince !: any;
  public daysSince !: any;

  private subscription !: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getLatestFlight();
  }

  getLatestFlight() {
    this.httpService.getLatestFlight().subscribe({
      next: (flight) => {
        this.flight = flight;

        const start = moment(this.flight.departureDatetime, environment.longDateTimeFormat);
        const end = moment(this.flight.arrivalDatetime, environment.longDateTimeFormat);

        this.duration = moment.duration(end.diff(start)).asHours();
        this.daysSince = start.diff(Date.now(), 'days');

        if(this.daysSince < 0) {
          this.daysSince = this.daysSince * -1;
        }

        this.weeksSince = Number(this.daysSince / 7).toFixed(1);
      },
      error: (e) => {
        console.error(e)
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.subscription !== "undefined") {
      this.subscription.unsubscribe();
    }
  }
}
