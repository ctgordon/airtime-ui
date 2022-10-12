import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {AircraftType} from "../../model/aircraftType";
import {TableConfig} from "../../model/table.config";

@Component({
  selector: 'app-aircraft-types',
  templateUrl: './aircraft-types.component.html',
  styleUrls: ['./aircraft-types.component.scss']
})
export class AircraftTypesComponent implements OnInit {

  public aircraftTypesList !: AircraftType[];
  public tableConfig: TableConfig = {
    data: [],
    headers: ['ID', 'Type'],
    editable: true,
  };

  private aircraftTypesSubscription!: Subscription;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAircraftTypes();
  }

  getAircraftTypes() {
    this.aircraftTypesSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft-types/`).subscribe({
      next: (v) => {
        this.aircraftTypesList = v;

        this.tableConfig.data = [];

        this.aircraftTypesList.forEach(aircraftType => {
          this.tableConfig.data.push([aircraftType.id, aircraftType.type]);
        });
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }
}
