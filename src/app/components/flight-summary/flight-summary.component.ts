import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Subscription} from "rxjs";
import {FlightSummary} from "../../model/flight.summary";
import * as moment from "moment/moment";
import {DateTimeService} from "../../services/date.time.service";

@Component({
  selector: 'app-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss']
})
export class FlightSummaryComponent implements OnInit, OnDestroy {

  private flightSummarySubscription!: Subscription;

  public loading: boolean = true;
  public flightSummary !: FlightSummary;
  public timeSinceLastFlight!: string;

  constructor(private httpService: HttpService, private dateTimeService: DateTimeService) {
  }

  ngOnInit(): void {
    this.getFlightSummary();
  }

  getFlightSummary() {
    this.flightSummarySubscription = this.httpService.getFlightSummary().subscribe({
      next: data => {
        this.flightSummary = data;


        this.flightSummary.totalHours = this.dateTimeService.hoursMinutesSeconds(this.flightSummary.totalHours);
        this.flightSummary.totalHoursDual = this.dateTimeService.hoursMinutesSeconds(this.flightSummary.totalHoursDual);
        this.flightSummary.totalHoursPIC = this.dateTimeService.hoursMinutesSeconds(this.flightSummary.totalHoursPIC);

        this.timeSinceLastFlight = moment(this.flightSummary.lastFlight.departureDatetime, 'YYYY-MM-DD hh:mm:ss').fromNow();
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.flightSummarySubscription !== "undefined") {
      this.flightSummarySubscription.unsubscribe();
    }
  }
}
