import {FormControl, Validators} from "@angular/forms";

export class ReportTypeForm {
  private _id = new FormControl(null);
  private _name = new FormControl(null, [Validators.required]);
  private _inUse = new FormControl(null);

  public constructor() {
  }

  get id(): FormControl {
    return this._id;
  }

  set id(value: FormControl) {
    this._id = value;
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get inUse(): FormControl {
    return this._inUse;
  }

  set inUse(value: FormControl) {
    this._inUse = value;
  }
}
