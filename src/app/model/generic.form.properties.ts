import {FormGroup} from "@angular/forms";
import {GenericFormElementProperties} from "./generic.form.element.properties";

export class GenericFormProperties {
  private _dialogTitle!: string;
  private _formGroup !: FormGroup;
  private _controls!: Array<GenericFormElementProperties>;

  public constructor() {
  }

  get dialogTitle(): string {
    return this._dialogTitle;
  }

  set dialogTitle(value: string) {
    this._dialogTitle = value;
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  set formGroup(value: FormGroup) {
    this._formGroup = value;
  }


  get controls(): Array<GenericFormElementProperties> {
    return this._controls;
  }

  set controls(value: Array<GenericFormElementProperties>) {
    this._controls = value;
  }
}
