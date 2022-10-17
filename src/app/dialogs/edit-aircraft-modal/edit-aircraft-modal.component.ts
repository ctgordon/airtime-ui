import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-edit-aircraft-modal',
  templateUrl: './edit-aircraft-modal.component.html',
  styleUrls: ['./edit-aircraft-modal.component.scss']
})
export class EditAircraftModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditAircraftModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
