import {FormControl} from "@angular/forms";

export class GenericFormElementProperties {
  private _label!: string;
  private _id!: string;
  private _type!: string;
  private _control!: FormControl;
  private _columns!: number;

  public constructor(id: string, label: string, type: string, control: FormControl, columns: number) {
    this.id = id;
    this.label = label;
    this.type = type;
    this.control = control;
    this.columns = columns;
  }


  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get control(): FormControl {
    return this._control;
  }

  set control(value: FormControl) {
    this._control = value;
  }


  get columns(): number {
    return this._columns;
  }

  set columns(value: number) {
    this._columns = value;
  }
}
