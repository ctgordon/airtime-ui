import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {AircraftType} from "../../model/aircraftType";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-select-aircraft-type',
  templateUrl: './select-aircraft-type.component.html',
  styleUrls: ['./select-aircraft-type.component.scss']
})
export class SelectAircraftTypeComponent implements OnInit, OnDestroy {

  @Input() control!: FormControl;

  private aircraftTypesSubscription!: Subscription;

  public aircraftTypesList !: AircraftType[];

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAircraftTypes();
  }

  getAircraftTypes() {
    this.aircraftTypesSubscription = this.httpService.getAircraftTypes().subscribe({
      next: (data) => {
        this.aircraftTypesList = data;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.aircraftTypesSubscription !== "undefined") {
      this.aircraftTypesSubscription.unsubscribe();
    }
  }
}
