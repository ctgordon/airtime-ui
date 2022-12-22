import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {CustomReport} from "../../model/custom.report";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FlightSummary} from "../../model/flight.summary";
import {environment} from "../../../environments/environment";
import {CustomReportForm} from "../../forms/custom.report.form";
import {GenericFormComponent} from "../../dialogs/generic-form/generic-form.component";
import {GenericFormProperties} from "../../model/generic.form.properties";
import {FormGroup} from "@angular/forms";
import {GenericFormElementProperties} from "../../model/generic.form.element.properties";
import * as moment from "moment/moment";

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

  public genericFormProperties: GenericFormProperties = new GenericFormProperties();
  public customReportForm: CustomReportForm = new CustomReportForm();

  constructor(private httpService: HttpService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCustomReports();
  }

  getCustomReports() {
    this.httpService.getCustomReports().subscribe({
      next: (data) => {
        this.customReports = data;
        this.setGenericFormProperties();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  setGenericFormProperties():void {
    this.genericFormProperties.dialogTitle = 'Custom report';
    this.genericFormProperties.formGroup = new FormGroup({});
    this.genericFormProperties.formGroup.addControl('id', this.customReportForm.id);
    this.genericFormProperties.formGroup.addControl('reportName', this.customReportForm.reportName);
    this.genericFormProperties.formGroup.addControl('reportType', this.customReportForm.reportType);
    this.genericFormProperties.formGroup.addControl('startDate', this.customReportForm.startDate);
    this.genericFormProperties.formGroup.addControl('startTime', this.customReportForm.startTime);
    this.genericFormProperties.formGroup.addControl('endDate', this.customReportForm.endDate);
    this.genericFormProperties.formGroup.addControl('endTime', this.customReportForm.endTime);
    this.genericFormProperties.formGroup.addControl('inUse', this.customReportForm.inUse);

    this.genericFormProperties.controls = [
      new GenericFormElementProperties('id', 'id', 'text', this.customReportForm.id, 12, [], null, ''),
      new GenericFormElementProperties('reportName', 'Report name', 'text', this.customReportForm.reportName, 12, [], null, ''),
      new GenericFormElementProperties('reportType', 'Report type', 'select', this.customReportForm.reportType, 12, this.customReports, 'id', 'reportName'),
      new GenericFormElementProperties('startDate', 'Start date', 'date', this.customReportForm.startDate, 6, [], null, ''),
      new GenericFormElementProperties('startTime', 'Start time', 'time', this.customReportForm.startTime, 4, [], null, ''),
      new GenericFormElementProperties('endDate', 'End date', 'date', this.customReportForm.endDate, 6, [], null, ''),
      new GenericFormElementProperties('endTime', 'End time', 'time', this.customReportForm.endTime, 4, [], null, ''),
      new GenericFormElementProperties('inUse', 'In use', 'switch', this.customReportForm.inUse, 12, [], null, ''),
    ];
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

    const startDate = moment(report.startDate, environment.longDateTimeFormat).format(environment.dateFormat);
    const startTime = moment(report.startDate, environment.longDateTimeFormat).format(environment.timeFormat);
    const endDate = moment(report.endDate, environment.longDateTimeFormat).format(environment.dateFormat);
    const endTime = moment(report.endDate, environment.longDateTimeFormat).format(environment.timeFormat);

    this.customReportForm.id.patchValue(report.id);
    this.customReportForm.reportName.patchValue(report.reportName);
    this.customReportForm.reportType.patchValue(report.reportType.id);
    this.customReportForm.startDate.patchValue(startDate);
    this.customReportForm.startTime.patchValue(startTime);
    this.customReportForm.endDate.patchValue(endDate);
    this.customReportForm.endTime.patchValue(endTime);
    this.customReportForm.inUse.patchValue(report.inUse);

    const dialogRef = this.dialog.open(GenericFormComponent, {
      data: this.genericFormProperties,
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
