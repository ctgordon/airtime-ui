import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableConfig} from "../../model/table.config";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../../model/flight";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {Aircraft} from "../../model/aircraft";
import {Person} from "../../model/person";
import {ValidatedDropdown} from "../../model/validated.dropdown";

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
    takeOffs: new FormControl(null),
    landings: new FormControl(null),
  });
  public flightList!: Flight[];
  public aircraftList!: Aircraft[];
  public peopleList!: Person[];

  public peopleDropdown!: ValidatedDropdown;
  public aircraftDropdown!: ValidatedDropdown;

  private aircraftSubscription!: Subscription;
  private flightSubscription!: Subscription;
  private peopleSubscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getFlights();
    this.getAircraft();
    this.getPeople();
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
    this.aircraftSubscription = this.httpService.getAircraft().subscribe({
      next: aircraft => {
        this.aircraftList = aircraft;
        this.aircraftList.sort((a, b) => a.tailNumber.localeCompare(b.tailNumber));
        this.aircraftDropdown = {
          formControl: this.aircraft,
          id: 'aircraft',
          label: 'Aircraft',
          list: this.aircraftList,
          optionLabel: 'tailNumber',
          optionValue: 'id'
        };
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }

  getPeople() {
    this.peopleSubscription = this.httpService.getPeople().subscribe({
      next: people => {
        this.peopleList = people;
        this.peopleList.sort((a, b) => a.name.localeCompare(b.name));
        this.peopleDropdown = {
          formControl: this.pilotInCommand,
          id: 'pilotInCommand',
          label: 'Pilot in command',
          list: this.peopleList,
          optionLabel: 'moniker',
          optionValue: 'id'
        };
        const defaultOption = this.peopleList.find(it => it.moniker === 'SELF');
        if (defaultOption) {
          this.pilotInCommand.patchValue(defaultOption.id);
        }
      },
      error: err => {
        console.error(err);
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

  get takeOffs(): FormControl {
    return this.flightForm.get('takeOffs') as FormControl;
  }

  get landings(): FormControl {
    return this.flightForm.get('landings') as FormControl;
  }

  ngOnDestroy() {
    const subscriptions = [this.aircraftSubscription, this.flightSubscription, this.peopleSubscription];

    subscriptions.forEach(subscription => {
      if (typeof subscription !== "undefined") {
        subscription.unsubscribe();
      }
    });
  }
}
