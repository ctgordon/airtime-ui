import {Component, OnInit} from '@angular/core';
import {read, utils, writeFile} from 'xlsx';
import * as moment from "moment";
import {Flight} from "../../model/flight";
import {A, F} from "@angular/cdk/keycodes";
import {Aircraft} from "../../model/aircraft";
import {Person} from "../../model/person";
import {Airport} from "../../model/airport";

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss']
})
export class SpreadsheetComponent implements OnInit {

  public flights!: any[];

  constructor() {
  }

  ngOnInit(): void {
  }

  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          this.flights = utils.sheet_to_json(wb.Sheets[sheets[0]]);

          Object.keys(this.flights).forEach((k, v) => {
            const currentFlight = this.flights[v];

            console.log(currentFlight);

            const flight: Flight = new Flight();

            const date = currentFlight["Date"];
            const departureTime = this.convertTime(currentFlight["Departure time G.M.T"]);
            const arrivalTime = this.convertTime(currentFlight["Arrival time G.M.T"]);
            const remarks = currentFlight["Remarks"].trim();
            const type = currentFlight["Type"].trim();
            const registration = currentFlight["Registration"].trim();
            const landings = 0;
            const takeOffs = 0;

            const formattedDate = this.getDate(date);
            const departureDateTime = moment(`${formattedDate} ${departureTime}`).format('YYYY-MM-DD HH:mm:ss.SSS').toString();
            const arrivalDateTime = moment(`${formattedDate} ${arrivalTime}`).format('YYYY-MM-DD HH:mm:ss.SSS').toString();
            const aircraft = this.getAircraft(type, registration);
            const person = this.getPerson();
            const airport = this.getAirport();

            flight.departureDatetime = departureDateTime;
            flight.arrivalDatetime = arrivalDateTime;
            flight.aircraft = aircraft;
            flight.pilotInCommand = person;
            flight.departureAirport = airport;
            flight.arrivalAirport = airport;
            flight.landings = landings;
            flight.takeOffs = takeOffs;
            flight.remarks = remarks;
            console.log(flight);
          });
        }
      }
      reader.readAsArrayBuffer(file);
    }

  }

  getAirport(): Airport {
    return new Airport();
  }

  getPerson(): Person {
    return new Person();
  }

  getAircraft(type: string, registration: string): Aircraft {
    return new Aircraft();
  }

  getDate(date: any) {
    let formattedDate;

    const converted = this.convertDate(date);

    if (typeof date !== "undefined") {
      if (converted) {
        const formatted = this.formatDate(converted);
        if (formatted) {
          formattedDate = formatted;
        }
      } else {
        formattedDate = this.formatDate(date);
      }
    }

    return formattedDate;
  }

  formatDate(date: null | Date) {
    const isValid = moment(date, 'DD/MM/YYYY');
    if (isValid) {
      return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    } else {
      return null;
    }
  }

  convertDate(excelTimestamp: number) {
    const secondsInDay = 24 * 60 * 60;
    const excelEpoch = new Date(1899, 11, 31);
    const excelEpochAsUnixTimestamp = excelEpoch.getTime();
    const missingLeapYearDay = secondsInDay * 1000;
    const delta = excelEpochAsUnixTimestamp - missingLeapYearDay;
    const excelTimestampAsUnixTimestamp = excelTimestamp * secondsInDay * 1000;
    const parsed = excelTimestampAsUnixTimestamp + delta;
    return isNaN(parsed) ? null : new Date(parsed);
  };

  convertTime(time: number) {
    let baseNumber = (time * 24)
    let hour = Math.floor(baseNumber).toString();
    if (hour.length < 2) {
      hour = '0' + hour;
    }

    let minute = Math.round((baseNumber % 1) * 60).toString();
    if (minute.length < 2) {
      minute = '0' + minute;
    }
    return (hour + ':' + minute + ':00');
  }
}
