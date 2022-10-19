import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {AircraftType} from "../../model/aircraftType";
import {TableConfig} from "../../model/table.config";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-aircraft-types',
  templateUrl: './aircraft-types.component.html',
  styleUrls: ['./aircraft-types.component.scss']
})
export class AircraftTypesComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public aircraftTypesList !: AircraftType[];
  public tableConfig: TableConfig = {
    data: [],
    headers: ['ID', 'Type'],
    editable: true,
  };
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
      next: (v) => {
        this.aircraftTypesList = v;

        this.tableConfig.data = [];

        this.aircraftTypesList.forEach(aircraftType => {
          this.tableConfig.data.push({obj: aircraftType, values: [aircraftType.id, aircraftType.type]});
        });
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
    if (typeof this.aircraftTypesSubscription !== undefined) {
      this.aircraftTypesSubscription.unsubscribe();
    }
  }
}
