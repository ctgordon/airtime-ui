import {Component, OnDestroy, OnInit} from '@angular/core';
import {Aircraft} from "../../model/aircraft";
import {HttpService} from "../../services/http.service";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AircraftType} from "../../model/aircraftType";
import {TableConfig} from "../../model/table.config";

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent implements OnInit, OnDestroy {

  public aircraftList!: Aircraft[];
  public aircraftTypesList!: AircraftType[];
  public aircraftForm!: FormGroup;
  public tableConfig: TableConfig = {
    data: [],
    headers: ['Tail number', 'Type'],
    editable: true,
  };

  private aircraftSubscription!: Subscription;
  private aircraftTypesSubscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAircraft();
    this.getAircraftTypes();
    this.aircraftForm = new FormGroup({
      tailNumber: new FormControl('G-BOVK', [Validators.required]),
      aircraftType: new FormControl(null, [Validators.required])
    });
  }

  getAircraft() {
    this.aircraftSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft/`).subscribe({
      next: (v) => {
        this.aircraftList = v;

        this.tableConfig.data = [];

        this.aircraftList.forEach(aircraft => {
          this.tableConfig.data.push([aircraft.tailNumber, aircraft.aircraftType.type]);
        });
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  getAircraftTypes() {
    this.aircraftTypesSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft-types/`).subscribe({
      next: (v) => {
        this.aircraftTypesList = v;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  get tailNumber(): FormControl {
    return this.aircraftForm.get('tailNumber') as FormControl;
  }

  get aircraftType(): FormControl {
    return this.aircraftForm.get('aircraftType') as FormControl;
  }

  save() {
    if (this.aircraftType.value) {
      const id = this.aircraftType.value;
      const type = this.aircraftTypesList.find(it => it.id = id);
      if (type) {
        this.aircraftForm.get('aircraftType')?.patchValue(type);
      }
    }

    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft/`, this.aircraftForm.value).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        console.log('Getting here');
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.aircraftSubscription !== undefined) {
      this.aircraftSubscription.unsubscribe();
    }
    if (typeof this.aircraftTypesSubscription !== undefined) {
      this.aircraftTypesSubscription.unsubscribe();
    }
  }
}
