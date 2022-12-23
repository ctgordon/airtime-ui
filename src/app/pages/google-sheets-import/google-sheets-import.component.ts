import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {GoogleSheetEntry} from "../../model/google.sheet.entry";
import {environment} from "../../../environments/environment";
import * as moment from 'moment';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-google-sheets-import',
  templateUrl: './google-sheets-import.component.html',
  styleUrls: ['./google-sheets-import.component.scss']
})
export class GoogleSheetsImportComponent implements OnInit {

  public entries!: GoogleSheetEntry[];
  public loading = true;

  constructor(private httpService: HttpService, private _snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.httpService.getData('http://localhost:8082/entries').subscribe((data: GoogleSheetEntry[]) => {
      if (data) {
        this.entries = data;
        this.entries.forEach(entry => {
          this.changeAirportNameToAirportCode(entry);
          if (entry.pic.trim().toUpperCase() === 'SELF') {
            entry.pic = 'Christopher Gordon';
          }
          if (entry.pic.trim().toUpperCase() === 'J.BILLINGE') {
            entry.pic = 'Jeremy Billinge';
          }
          if (entry.pic.trim().toUpperCase() === 'M.SPAVEN') {
            entry.pic = 'Malcolm Spaven';
          }
        });
      }
      this.loading = false;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  changeAirportNameToAirportCode(entry: GoogleSheetEntry) {
    const conversions = [
      {name: 'FIFE', code: 'EGPJ'},
      {name: 'DUNDEE', code: 'EGPN'},
      {name: 'CARLISLE', code: 'EGNC'},
      {name: 'PERTH', code: 'EGPT'},
      {name: 'INVERNESS', code: 'EGPE'},
      {name: 'CUMBERNAULD', code: 'EGPG'},
    ];

    conversions.forEach(conversion => {
      if (entry.from.trim().toUpperCase() === conversion.name.trim().toUpperCase()) {
        entry.from = conversion.code.toUpperCase();
      }
      if (entry.to.trim().toUpperCase() === conversion.name.trim().toUpperCase()) {
        entry.to = conversion.code.toUpperCase();
      }
    });
  }

  formatDate(date: string) {
    const validFormats = ['DD/MM/YYYY', 'DD/M/YYYY'];
    let formatted;

    validFormats.forEach(fmt => {
      const isValid = moment(date, fmt);
      if (isValid) {
        formatted = moment(date, fmt).format('YYYY-MM-DD').toString();
      }
    });

    return formatted;
  }

  saveData() {
    this.loading = true;

    this.entries.forEach(entry => {
      const date = this.formatDate(entry.date);
      const departureTime = moment(entry.departureTime, 'HH:mm:ss').format('HH:mm:ss').toString();
      if (entry.arrivalTime === '24:07:00') {
        entry.arrivalTime = '00:07:00';
      }
      const arrivalTime = moment(entry.arrivalTime, 'HH:mm:ss').format('HH:mm:ss').toString();

      entry.departureDatetime = `${date} ${departureTime}`;
      entry.arrivalDatetime = `${date} ${arrivalTime}`;
    });

    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/google-entries/`, this.entries).subscribe(data => {
      this.loading = false;
      this.openSnackBar('Saved', 'Ok!');
    }, error => {
      this.loading = false;
      console.error(error);
    });
  }

}
