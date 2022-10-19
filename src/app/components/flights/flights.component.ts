import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableConfig} from "../../model/table.config";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../../model/flight";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {Aircraft} from "../../model/aircraft";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public tableConfig: TableConfig = {
    data: [],
    headers: ['ID', 'Date', 'Type', 'Registration', 'Pilot in command', 'From', 'To', 'Departure time', 'Arrival time', 'Dual', 'PIC'],
    editable: true,
  };
  public flightForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    aircraft: new FormControl(null, [Validators.required]),
    pilotInCommand: new FormControl(null, [Validators.required]),
    departureAirport: new FormControl(null, [Validators.required]),
    arrivalAirport: new FormControl(null, [Validators.required]),
    departureDatetime: new FormControl(null, [Validators.required]),
    arrivalDatetime: new FormControl(null, [Validators.required]),
    remarks: new FormControl(null),
  });
  public flightList!: Flight[];
  public aircraftList!: Aircraft[];

  private aircraftSubscription!: Subscription;
  private flightSubscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getFlights();
    this.getAircraft();
  }

  getFlights() {
    this.loading = true;
    this.flightSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/flights/`).subscribe({
      next: (data) => {
        this.flightList = data;
        this.tableConfig.data = [];

        this.flightList.forEach(flight => {
          this.tableConfig.data.push({
            obj: flight,
            values: [flight.id, null, null, null, null, null, null, null, null, null, null]
          });
        });
        this.loading = false;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getAircraft() {
    this.loading = true;
    this.aircraftSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft/`).subscribe({
      next: (data) => {
        this.aircraftList = data;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  editFlight(flight: Flight) {
  }

  save() {

  }

  get id(): FormControl {
    return this.flightForm.get('id') as FormControl;
  }

  get aircraft(): FormControl {
    return this.flightForm.get('aircraft') as FormControl;
  }

  get pilotInCommand(): FormControl {
    return this.flightForm.get('pilotInCommand') as FormControl;
  }

  get departureAirport(): FormControl {
    return this.flightForm.get('departureAirport') as FormControl;
  }

  get arrivalAirport(): FormControl {
    return this.flightForm.get('arrivalAirport') as FormControl;
  }

  get departureDatetime(): FormControl {
    return this.flightForm.get('departureDatetime') as FormControl;
  }

  get arrivalDatetime(): FormControl {
    return this.flightForm.get('arrivalDatetime') as FormControl;
  }

  get remarks(): FormControl {
    return this.flightForm.get('remarks') as FormControl;
  }

  ngOnDestroy() {
    const subscriptions = [this.aircraftSubscription, this.flightSubscription];

    subscriptions.forEach(subscription => {
      if (typeof subscription !== "undefined") {
        subscription.unsubscribe();
      }
    });
  }
}
