import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../../model/flight";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {Aircraft} from "../../model/aircraft";
import {Person} from "../../model/person";
import {ValidatedDropdown} from "../../model/validated.dropdown";
import {Airport} from "../../model/airport";
import * as moment from 'moment';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {ConfirmDialog} from "../../model/confirm.dialog";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public flightForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    aircraft: new FormControl(17, [Validators.required]),
    pilotInCommand: new FormControl(1, [Validators.required]),
    departureAirport: new FormControl(8, [Validators.required]),
    arrivalAirport: new FormControl(8, [Validators.required]),
    departureDate: new FormControl('2022-12-16', [Validators.required]),
    arrivalDate: new FormControl('2022-12-16', [Validators.required]),
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
  public dateTimeFormat: string = 'YYYY-MM-DD HH:mm:ss.SSS'
  public timeSinceLastFlight!: string;

  private aircraftSubscription!: Subscription;
  private flightSubscription!: Subscription;
  private peopleSubscription!: Subscription;
  private airportSubscription!: Subscription;

  constructor(
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.flightList = [];
    this.getFlights();
    this.getAircraft();
    this.getAirports();
    this.getPeople();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getFlights() {
    this.loading = true;
    this.flightSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/flights/`).subscribe({
      next: (data) => {
        this.flightList = data;

        if (this.flightList.length) {
          this.flightList.forEach(flight => {
            const diff = moment(flight.arrivalDatetime, 'YYYY-MM-DD hh:mm:ss').diff(moment(flight.departureDatetime, 'YYYY-MM-DD hh:mm:ss'));
            flight.flightTime = moment.utc(moment.duration(diff).asMilliseconds()).format('HH:mm');
          });
          this.flightList.sort((a, b) => b.departureDatetime.localeCompare(a.departureDatetime));

          this.timeSinceLastFlight = moment(this.flightList[0].arrivalDatetime).fromNow();
        }

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

  deleteFlight(flight: Flight) {
    this.loading = true;
    this.httpService.deleteData(`${environment.apiServer}${environment.app}${environment.endpoint}/flight/`, flight).subscribe({
      next: () => {
        this.openSnackBar('Flight deleted', 'Ok!')
      },
      error: (e) => {
        console.error(e)
        this.loading = false;
        this.openSnackBar('Flight not deleted', 'Ok!')
      },
      complete: () => {
        this.getFlights();
        this.loading = false;
      }
    });
  }

  confirmDeleteFlight(flight: Flight) {
    const dialogConfig = new MatDialogConfig();
    const dialogData = new ConfirmDialog("Confirm action", "Are you sure you want to delete this flight?");
    dialogConfig.autoFocus = true;
    dialogConfig.data = dialogData;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteFlight(flight);
      }
    });
  }

  buildDtoFromSelectedValue(control: FormControl, objects: any): any {
    if (control.value) {
      const selected = control.value;
      return objects.find((it: { id: any; }) => it.id = selected);
    }
  }

  save() {
    this.loading = true;

    const flight: Flight = new Flight();

    if (this.flightForm.value) {
      flight.pilotInCommand = this.buildDtoFromSelectedValue(this.pilotInCommand, this.peopleList);
      flight.aircraft = this.buildDtoFromSelectedValue(this.aircraft, this.aircraftList);
      flight.departureAirport = this.buildDtoFromSelectedValue(this.departureAirport, this.airportList);
      flight.arrivalAirport = this.buildDtoFromSelectedValue(this.arrivalAirport, this.airportList);
      flight.departureDatetime = moment(`${this.departureDate.value} ${this.departureTime.value}`).format(this.dateTimeFormat).toString();
      flight.arrivalDatetime = moment(`${this.arrivalDate.value}T${this.arrivalTime.value}`).format(this.dateTimeFormat).toString();
    }

    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/flight/`, flight).subscribe({
      next: () => {
        this.flightForm.reset();
      },
      error: (e) => {
        console.error(e)
        this.loading = false;
      },
      complete: () => {
        this.getFlights();
        this.loading = false;
      }
    });
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
