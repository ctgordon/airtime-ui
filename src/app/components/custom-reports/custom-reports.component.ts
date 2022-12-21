import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {CustomReport} from "../../model/custom.report";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-custom-reports',
  templateUrl: './custom-reports.component.html',
  styleUrls: ['./custom-reports.component.scss']
})
export class CustomReportsComponent implements OnInit, OnDestroy {

  private customReportSubscription!: Subscription;

  public customReports!: CustomReport[];
  public loading: boolean = true;

  constructor(private httpService: HttpService) {
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

  ngOnDestroy() {
    if (typeof this.customReportSubscription !== "undefined") {
      this.customReportSubscription.unsubscribe();
    }
  }
}
