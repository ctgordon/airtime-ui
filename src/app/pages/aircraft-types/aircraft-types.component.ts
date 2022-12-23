import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {AircraftType} from "../../model/aircraftType";
import {TableConfig} from "../../model/table.config";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Airport} from "../../model/airport";
import {Aircraft} from "../../model/aircraft";

@Component({
  selector: 'app-aircraft-types',
  templateUrl: './aircraft-types.component.html',
  styleUrls: ['./aircraft-types.component.scss']
})
export class AircraftTypesComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public aircraftTypesList !: AircraftType[];
  public displayedColumns = [
    {id: 'id', title: 'ID'},
    {id: 'type', title: 'Type'},
  ];
  public dataSource!: MatTableDataSource<AircraftType>;

  public aircraftTypeForm: FormGroup = new FormGroup({
      id: new FormControl(null),
      aircraftType: new FormControl(null, [Validators.required])
    }
  );

  private aircraftTypesSubscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAircraftTypes();
  }

  getAircraftTypes() {
    this.loading = true;
    this.aircraftTypesSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft-types/`).subscribe({
      next: (data) => {
        this.aircraftTypesList = data;
        this.dataSource = new MatTableDataSource(this.aircraftTypesList);
        this.loading = false;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  editAircraftType(aircraftType: AircraftType) {
    this.id.patchValue(aircraftType.id);
    this.aircraftType.patchValue(aircraftType.type);
  }

  save() {
    this.loading = true;

    const aircraftType: AircraftType = {id: 0, type: ''}

    if (this.aircraftTypeForm.valid) {
      aircraftType.id = this.id.value;
      aircraftType.type = this.aircraftType.value;
    }

    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft-types/`, aircraftType).subscribe({
      next: (v) => {
        this.getAircraftTypes();
        this.aircraftTypeForm.reset();
        this.loading = false;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        console.log('Getting here');
      }
    });
  }

  get id(): FormControl {
    return this.aircraftTypeForm.get('id') as FormControl;
  }

  get aircraftType(): FormControl {
    return this.aircraftTypeForm.get('aircraftType') as FormControl;
  }

  ngOnDestroy() {
    if (typeof this.aircraftTypesSubscription !== 'undefined') {
      this.aircraftTypesSubscription.unsubscribe();
    }
  }
}
