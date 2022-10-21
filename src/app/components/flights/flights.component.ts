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
import {Airport} from "../../model/airport";

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
    departureDate: new FormControl(null, [Validators.required]),
    arrivalDate: new FormControl(null, [Validators.required]),
    departureTime: new FormControl('12:00', [Validators.required]),
    arrivalTime: new FormControl('13:00', [Validators.required]),
    remarks: new FormControl(null),
    takeOffs: new FormControl(0, [Validators.min(0)]),
    landings: new FormControl(0, [Validators.min(0)]),
  });
  public flightList!: Flight[];
  public aircraftList!: Aircraft[];
  public peopleList!: Person[];
  public airportList!: Airport[];

  public peopleDropdown!: ValidatedDropdown;
  public aircraftDropdown!: ValidatedDropdown;
  public arrivalAirportDropdown!: ValidatedDropdown;
  public departureAirportDropdown!: ValidatedDropdown;

  private aircraftSubscription!: Subscription;
  private flightSubscription!: Subscription;
  private peopleSubscription!: Subscription;
  private airportSubscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getFlights();
    this.getAircraft();
    this.getAirports();
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

  getAirports() {
    this.airportSubscription = this.httpService.getAirports().subscribe({
      next: airports => {
        this.airportList = airports;
        this.airportList.sort((a, b) => a.airportName.localeCompare(b.airportName));
        this.arrivalAirportDropdown = {
          formControl: this.arrivalAirport,
          id: 'arrivalAirport',
          label: 'Arrival airport',
          list: this.airportList,
          optionLabel: 'airportName',
          optionValue: 'id'
        };
        this.departureAirportDropdown = {
          formControl: this.departureAirport,
          id: 'departureAirport',
          label: 'Departure airport',
          list: this.airportList,
          optionLabel: 'airportName',
          optionValue: 'id'
        };
      },
      error: (e) => {
        console.error(e);
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

  get departureDate(): FormControl {
    return this.flightForm.get('departureDate') as FormControl;
  }

  get arrivalDate(): FormControl {
    return this.flightForm.get('arrivalDate') as FormControl;
  }

  get departureTime(): FormControl {
    return this.flightForm.get('departureTime') as FormControl;
  }

  get arrivalTime(): FormControl {
    return this.flightForm.get('arrivalTime') as FormControl;
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
    const subscriptions = [this.aircraftSubscription, this.flightSubscription, this.peopleSubscription, this.airportSubscription];

    subscriptions.forEach(subscription => {
      if (typeof subscription !== "undefined") {
        subscription.unsubscribe();
      }
    });
  }
}
