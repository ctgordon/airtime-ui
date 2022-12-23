import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../../model/flight";
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {Aircraft} from "../../model/aircraft";
import {Person} from "../../model/person";
import {Airport} from "../../model/airport";
import * as moment from 'moment';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {GenericFormComponent} from "../../dialogs/generic-form/generic-form.component";
import {GenericFormProperties} from "../../model/generic.form.properties";
import {GenericFormElementProperties} from "../../model/generic.form.element.properties";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {

  public displayedColumns = [
    {id: 'id', title: 'ID', hidden: false},
    {id: 'aircraft', title: 'Aircraft', hidden: false},
    {id: 'pilotInCommand', title: 'PIC', hidden: false},
    {id: 'departureAirport', title: 'Departure airport', hidden: false},
    {id: 'arrivalAirport', title: 'Arrival airport', hidden: false},
    {id: 'departureDate', title: 'Departure date', hidden: false},
    {id: 'departureTime', title: 'Departure time', hidden: false},
    {id: 'arrivalDate', title: 'Arrival date', hidden: false},
    {id: 'arrivalTime', title: 'Arrival time', hidden: false},
    {id: 'remarks', title: 'Remarks', hidden: false},
    {id: 'takeOffs', title: 'Take offs', hidden: false},
    {id: 'landings', title: 'Landings', hidden: false},
    {id: 'edit', title: '', hidden: false},
    {id: 'flight', title: '', hidden: false},
  ];
  public dataSource!: MatTableDataSource<any>;

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
  public genericForm: GenericFormProperties = new GenericFormProperties();

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

    this.genericForm.formGroup = new FormGroup({});
    this.genericForm.formGroup.addControl('aircraft', this.aircraft);
    this.genericForm.formGroup.addControl('pilotInCommand', this.pilotInCommand);
    this.genericForm.formGroup.addControl('departureAirport', this.departureAirport);
    this.genericForm.formGroup.addControl('arrivalAirport', this.arrivalAirport);
    this.genericForm.formGroup.addControl('departureDate', this.departureDate);
    this.genericForm.formGroup.addControl('arrivalDate', this.arrivalDate);
    this.genericForm.formGroup.addControl('departureTime', this.departureTime);
    this.genericForm.formGroup.addControl('arrivalTime', this.arrivalTime);
    this.genericForm.formGroup.addControl('remarks', this.remarks);
    this.genericForm.formGroup.addControl('takeOffs', this.takeOffs);
    this.genericForm.formGroup.addControl('landings', this.landings);

    this.genericForm.controls = [
      new GenericFormElementProperties('', '', 'aircraftType', this.aircraft, 12),
      new GenericFormElementProperties('', '', 'pilotInCommand', this.pilotInCommand, 12),
      new GenericFormElementProperties('', 'Departure airport', 'airport', this.departureAirport, 12),
      new GenericFormElementProperties('', 'Arrival airport', 'airport', this.arrivalAirport, 12),
      new GenericFormElementProperties('departureDate', 'Departure date', 'date', this.departureDate, 6),
      new GenericFormElementProperties('arrivalDate', 'Arrival date', 'date', this.arrivalDate, 6),
      new GenericFormElementProperties('departureTime', 'Departure time', 'time', this.departureTime, 4),
      new GenericFormElementProperties('arrivalTime', 'Arrival time', 'time', this.arrivalTime, 4),
      new GenericFormElementProperties('remarks', 'Remarks', 'text', this.remarks, 12),
      new GenericFormElementProperties('takeOffs', 'Take offs', 'number', this.takeOffs, 2),
      new GenericFormElementProperties('landings', 'Landings', 'number', this.landings, 2),
    ];
  }

  getFlights() {
    this.loading = true;
    this.flightSubscription = this.httpService.getFlights().subscribe({
      next: (data) => {
        this.flightList = data;

        const filtered: Array<any> = [];

        if (this.flightList.length) {
          this.flightList.forEach(flight => {
            const diff = moment(flight.arrivalDatetime, environment.longDateTimeFormat).diff(moment(flight.departureDatetime, environment.longDateTimeFormat));
            flight.flightTime = moment.utc(moment.duration(diff).asMilliseconds()).format('HH:mm');

            filtered.push({
              id: flight.id,
              aircraft: flight.aircraft.tailNumber,
              pilotInCommand: flight.pilotInCommand.moniker,
              departureAirport: flight.departureAirport.airportCode,
              arrivalAirport: flight.arrivalAirport.airportCode,
              departureDate: moment(flight.departureDatetime, environment.longDateTimeFormat).format(environment.dateFormat),
              departureTime: moment(flight.departureDatetime, environment.longDateTimeFormat).format(environment.timeFormat),
              arrivalDate: moment(flight.arrivalDatetime, environment.longDateTimeFormat).format(environment.dateFormat),
              arrivalTime: moment(flight.arrivalDatetime, environment.longDateTimeFormat).format(environment.timeFormat),
              remarks: flight.remarks,
              takeOffs: flight.takeOffs,
              landings: flight.landings,
              flight: flight
            });

          });
          this.flightList.sort((a, b) => b.departureDatetime.localeCompare(a.departureDatetime));
        }

        this.dataSource = new MatTableDataSource<any>(filtered);

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

  addFlight() {
    this.genericForm.dialogTitle = 'Add flight';
    this.openDialog();
  }

  editFlight(data: any) {
    const flight = data.flight;
    this.genericForm.dialogTitle = 'Edit flight';
    this.id.patchValue(flight.id);
    this.aircraft.patchValue(flight.aircraft.aircraftType.id);
    this.pilotInCommand.patchValue(flight.pilotInCommand.id);
    this.departureAirport.patchValue(flight.departureAirport.id);
    this.arrivalAirport.patchValue(flight.arrivalAirport.id);
    this.departureDate.patchValue(moment(flight.departureDatetime, environment.longDateTimeFormat).format(environment.dateFormat).toString());
    this.arrivalDate.patchValue(moment(flight.arrivalDatetime, environment.longDateTimeFormat).format(environment.dateFormat));
    this.departureTime.patchValue(moment(flight.departureDatetime, environment.longDateTimeFormat).format(environment.timeFormat));
    this.arrivalTime.patchValue(moment(flight.arrivalDatetime, environment.longDateTimeFormat).format(environment.timeFormat));
    this.remarks.patchValue(flight.remarks);
    this.takeOffs.patchValue(flight.takeOffs);
    this.landings.patchValue(flight.landings);
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
      flight.departureDatetime = moment(`${this.departureDate.value} ${this.departureTime.value}`).format(environment.longDateTimeFormat).toString();
      flight.arrivalDatetime = moment(`${this.arrivalDate.value}T${this.arrivalTime.value}`).format(environment.longDateTimeFormat).toString();
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
