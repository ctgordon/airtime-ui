import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomReport} from "../../model/custom.report";
import {environment} from "../../../environments/environment";
import * as moment from 'moment';
import {HttpService} from "../../services/http.service";
import {ReportType} from "../../model/report.type";
import {Subscription} from "rxjs";
import {ValidatedDropdown} from "../../model/validated.dropdown";
import {FlightSummary} from "../../model/flight.summary";

@Component({
  selector: 'app-custom-report',
  templateUrl: './custom-report.component.html',
  styleUrls: ['./custom-report.component.scss']
})
export class CustomReportComponent implements OnInit, OnDestroy {
  public customReportForm: FormGroup = new FormGroup({});
  private reportTypeSubscription !: Subscription;

  public reportTypes!: ReportType[];
  public validatedDropdown!: ValidatedDropdown;

  constructor(
    public dialogRef: MatDialogRef<CustomReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomReport,
    private httpService: HttpService
  ) {
  }

  ngOnInit() {
    this.getReportTypes();

    const startDate = moment(this.data.startDate, environment.longDateTimeFormat).format(environment.dateFormat);
    const startTime = moment(this.data.startDate, environment.longDateTimeFormat).format(environment.timeFormat);
    const endDate = moment(this.data.endDate, environment.longDateTimeFormat).format(environment.dateFormat);
    const endTime = moment(this.data.endDate, environment.longDateTimeFormat).format(environment.timeFormat);

    this.customReportForm = new FormGroup({
      id: new FormControl(this.data.id),
      reportType: new FormControl(this.data.reportType.id, [Validators.required]),
      reportName: new FormControl(this.data.reportName, [Validators.required]),
      startDate: new FormControl(startDate, [Validators.required]),
      startTime: new FormControl(startTime, [Validators.required]),
      endDate: new FormControl(endDate, [Validators.required]),
      endTime: new FormControl(endTime, [Validators.required]),
      aircraft: new FormControl(this.data.aircraft.id),
      inUse: new FormControl(this.data.inUse)
    });
  }

  getReportTypes() {
    this.reportTypeSubscription = this.httpService.getReportTypes().subscribe({
      next: (data) => {
        this.reportTypes = data;

        this.validatedDropdown = {
          formControl: this.reportType,
          id: "reportType",
          label: "Report type",
          list: this.reportTypes,
          optionLabel: "name",
          optionValue: "id"
        };
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close();
  }

  get id(): FormControl {
    return this.customReportForm.get('id') as FormControl;
  }

  get reportType(): FormControl {
    return this.customReportForm.get('reportType') as FormControl;
  }

  get reportName(): FormControl {
    return this.customReportForm.get('reportName') as FormControl;
  }

  get startDate(): FormControl {
    return this.customReportForm.get('startDate') as FormControl;
  }

  get startTime(): FormControl {
    return this.customReportForm.get('startTime') as FormControl;
  }

  get endDate(): FormControl {
    return this.customReportForm.get('endDate') as FormControl;
  }

  get endTime(): FormControl {
    return this.customReportForm.get('endTime') as FormControl;
  }

  get aircraft(): FormControl {
    return this.customReportForm.get('aircraft') as FormControl;
  }

  get inUse(): FormControl {
    return this.customReportForm.get('inUse') as FormControl;
  }

  ngOnDestroy() {
    if (typeof this.reportTypeSubscription !== "undefined") {
      this.reportTypeSubscription.unsubscribe();
    }
  }
}
