import {Component, OnDestroy, OnInit} from '@angular/core';
import {Aircraft} from "../../model/aircraft";
import {HttpService} from "../../services/http.service";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AircraftType} from "../../model/aircraftType";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {GenericFormProperties} from "../../model/generic.form.properties";
import {GenericFormElementProperties} from "../../model/generic.form.element.properties";
import {GenericFormComponent} from "../../dialogs/generic-form/generic-form.component";

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent implements OnInit, OnDestroy {

  public displayedColumns = [
    {id: 'id', title: 'ID', hidden: false},
    {id: 'tailNumber', title: 'Tail number', hidden: false},
    {id: 'type', title: 'Type', hidden: false},
    {id: 'aircraft', title: '', hidden: true},
    {id: 'edit', title: '', hidden: false},
  ];

  public dataSource!: MatTableDataSource<any>;

  public aircraftList!: Aircraft[];
  public aircraftTypesList!: AircraftType[];
  public aircraftForm!: FormGroup;
  public loading: boolean = false;
  public genericForm: GenericFormProperties = new GenericFormProperties();

  private aircraftSubscription!: Subscription;

  constructor(private httpService: HttpService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAircraft();
    this.aircraftForm = new FormGroup({
      tailNumber: new FormControl(null, [Validators.required]),
      aircraftType: new FormControl(null, [Validators.required])
    });

    this.genericForm.formGroup = new FormGroup({});
    this.genericForm.formGroup.addControl('tailNumber', this.tailNumber);
    this.genericForm.formGroup.addControl('aircraftType', this.aircraftType);

    this.genericForm.controls = [
      new GenericFormElementProperties('name', 'Name', 'text', this.tailNumber, 12),
      new GenericFormElementProperties('', '', 'aircraftType', this.aircraftType, 12)
    ];
  }

  getAircraft() {
    this.loading = true;
    this.aircraftSubscription = this.httpService.getAircraft().subscribe({
      next: aircraft => {
        this.aircraftList = aircraft;

        const filtered: Array<any> = [];

        this.aircraftList.forEach(aircraft => {
          filtered.push({
            id: aircraft.id,
            tailNumber: aircraft.tailNumber,
            type: aircraft.aircraftType.type,
            aircraft: aircraft
          })
        });

        this.dataSource = new MatTableDataSource<any>(filtered);

        this.loading = false;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  addAircraft() {
    this.genericForm.dialogTitle = 'Add aircraft';
    this.openDialog();
  }

  editAircraft(data: any) {
    const aircraft = data.aircraft;
    this.genericForm.dialogTitle = 'Edit aircraft';
    this.tailNumber.patchValue(aircraft.tailNumber);
    this.aircraftType.patchValue(aircraft.aircraftType.id);
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(GenericFormComponent, {
      data: this.genericForm,
      width: '75vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.save();
    });
  }

  get tailNumber(): FormControl {
    return this.aircraftForm.get('tailNumber') as FormControl;
  }

  get aircraftType(): FormControl {
    return this.aircraftForm.get('aircraftType') as FormControl;
  }

  save() {
    this.loading = true;

    if (this.aircraftType.value) {
      const id = this.aircraftType.value;
      const type = this.aircraftTypesList.find(it => it.id = id);
      if (type) {
        this.aircraftForm.get('aircraftType')?.patchValue(type);
      }
    }

    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft/`, this.aircraftForm.value).subscribe({
      next: () => {
        this.aircraftForm.reset();
        this.getAircraft();
      },
      error: (e) => {
        console.error(e)
        this.loading = false;
      },
      complete: () => {
        console.log('Getting here');
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.aircraftSubscription !== 'undefined') {
      this.aircraftSubscription.unsubscribe();
    }
  }
}
