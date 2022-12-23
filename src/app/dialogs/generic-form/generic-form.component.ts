import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GenericFormProperties} from "../../model/generic.form.properties";
import {FormGroup} from "@angular/forms";
import {GenericFormElementProperties} from "../../model/generic.form.element.properties";
import {ValidatedDropdown} from "../../model/validated.dropdown";

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit {

  public dialogTitle!: string;
  public formGroup!: FormGroup;
  public controls !: GenericFormElementProperties[];

  constructor(
    public dialogRef: MatDialogRef<GenericFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericFormProperties
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.formGroup = this.data.formGroup;
    this.controls = this.data.controls;
  }

  save(): void {
    this.dialogRef.close();
  }

  getParams(element: GenericFormElementProperties): ValidatedDropdown {
    const dropdown: ValidatedDropdown = new ValidatedDropdown();

    dropdown.formControl = element.control;
    dropdown.id = element.id;
    dropdown.label = element.label;

    return dropdown;
  }
}
