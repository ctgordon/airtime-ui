import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {CustomReport} from "../../model/custom.report";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {CustomReportComponent} from "../../dialogs/custom-report/custom-report.component";
import {ReportType} from "../../model/report.type";
import {FlightSummary} from "../../model/flight.summary";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-custom-reports',
  templateUrl: './custom-reports.component.html',
  styleUrls: ['./custom-reports.component.scss']
})
export class CustomReportsComponent implements OnInit, OnDestroy {

  private customReportSubscription!: Subscription;

  public customReports!: CustomReport[];
  public loading: boolean = true;
  public flightSummary!: FlightSummary;

  constructor(private httpService: HttpService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCustomReports();
  }

  getCustomReports() {
    this.httpService.getCustomReports().subscribe({
      next: (data) => {
        this.customReports = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  run(report: CustomReport): void {
    this.loading = true;
    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/custom-report`, report).subscribe({
      next: (data) => {
        this.flightSummary = data;
        this.loading = false;
      }, complete: () => {
      },
      error: () => {
      }
    });
  }

  openDialog(report: CustomReport): void {
    const dialogRef = this.dialog.open(CustomReportComponent, {
      data: report,
      width: '75vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnDestroy() {
    if (typeof this.customReportSubscription !== "undefined") {
      this.customReportSubscription.unsubscribe();
    }
  }
}
