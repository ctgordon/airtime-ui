import {FormControl, Validators} from "@angular/forms";

export class CustomReportForm {
  private _id: FormControl = new FormControl(null);
  private _reportType: FormControl = new FormControl(null, [Validators.required]);
  private _reportName: FormControl = new FormControl(null, [Validators.required]);
  private _startDate: FormControl = new FormControl(null, [Validators.required]);
  private _startTime: FormControl = new FormControl(null, [Validators.required]);
  private _endDate: FormControl = new FormControl(null, [Validators.required]);
  private _endTime: FormControl = new FormControl(null, [Validators.required]);
  private _aircraft: FormControl = new FormControl(null);
  private _inUse: FormControl = new FormControl(null);

  public constructor() {
  }


  get id(): FormControl {
    return this._id;
  }

  set id(value: FormControl) {
    this._id = value;
  }

  get reportType(): FormControl {
    return this._reportType;
  }

  set reportType(value: FormControl) {
    this._reportType = value;
  }

  get reportName(): FormControl {
    return this._reportName;
  }

  set reportName(value: FormControl) {
    this._reportName = value;
  }

  get startDate(): FormControl {
    return this._startDate;
  }

  set startDate(value: FormControl) {
    this._startDate = value;
  }

  get startTime(): FormControl {
    return this._startTime;
  }

  set startTime(value: FormControl) {
    this._startTime = value;
  }

  get endDate(): FormControl {
    return this._endDate;
  }

  set endDate(value: FormControl) {
    this._endDate = value;
  }

  get endTime(): FormControl {
    return this._endTime;
  }

  set endTime(value: FormControl) {
    this._endTime = value;
  }

  get aircraft(): FormControl {
    return this._aircraft;
  }

  set aircraft(value: FormControl) {
    this._aircraft = value;
  }

  get inUse(): FormControl {
    return this._inUse;
  }

  set inUse(value: FormControl) {
    this._inUse = value;
  }
}
