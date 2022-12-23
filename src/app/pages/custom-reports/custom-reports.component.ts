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
import {MatTableDataSource} from "@angular/material/table";

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

  public displayedColumns = [
    {id: 'id', title: 'ID', hidden: false},
    {id: 'reportType', title: 'Type', hidden: false},
    {id: 'reportName', title: 'Name', hidden: false},
    {id: 'startDate', title: 'Starts', hidden: false},
    {id: 'endDate', title: 'Ends', hidden: false},
    {id: 'aircraft', title: 'Aircraft', hidden: false},
    {id: 'inUse', title: 'inUse', hidden: false},
  ];
  public dataSource!: MatTableDataSource<any>;

  constructor(private httpService: HttpService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCustomReports();
  }

  getCustomReports() {
    this.httpService.getCustomReports().subscribe({
      next: (data) => {
        this.customReports = data;

        const filtered: Array<{ id: string, reportType: string, reportName: string, startDate: string, endDate: string, aircraft: string, inUse: boolean }> = [];

        this.customReports.forEach(report => {
          filtered.push({
            id: report.id.toString(),
            reportType: report.reportType.name,
            reportName: report.reportName,
            startDate: report.startDate,
            endDate: report.endDate,
            aircraft: report.aircraft.tailNumber,
            inUse: report.inUse,
          });
        });

        this.dataSource = new MatTableDataSource<any>(filtered);
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

  setGenericFormProperties(): void {
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
      new GenericFormElementProperties('id', 'id', 'text', this.customReportForm.id, 12),
      new GenericFormElementProperties('reportName', 'Report name', 'text', this.customReportForm.reportName, 12),
      new GenericFormElementProperties('reportType', 'Report type', 'select', this.customReportForm.reportType, 12),
      new GenericFormElementProperties('startDate', 'Start date', 'date', this.customReportForm.startDate, 6),
      new GenericFormElementProperties('startTime', 'Start time', 'time', this.customReportForm.startTime, 4),
      new GenericFormElementProperties('endDate', 'End date', 'date', this.customReportForm.endDate, 6),
      new GenericFormElementProperties('endTime', 'End time', 'time', this.customReportForm.endTime, 4),
      new GenericFormElementProperties('inUse', 'In use', 'switch', this.customReportForm.inUse, 12),
    ];
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
