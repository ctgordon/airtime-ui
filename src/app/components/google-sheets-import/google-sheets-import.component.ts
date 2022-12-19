import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {GoogleSheetEntry} from "../../model/google.sheet.entry";
import {environment} from "../../../environments/environment";
import * as moment from 'moment';

@Component({
  selector: 'app-google-sheets-import',
  templateUrl: './google-sheets-import.component.html',
  styleUrls: ['./google-sheets-import.component.scss']
})
export class GoogleSheetsImportComponent implements OnInit {

  public entries!: GoogleSheetEntry[];
  public loading = true;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.httpService.getData('http://localhost:8082/entries').subscribe((data: GoogleSheetEntry[]) => {
      if (data) {
        this.entries = data;
      }
      this.loading = false;
    });
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


  formatDate(date: null | Date) {
    const isValid = moment(date, 'DD/MM/YYYY');
    if (isValid) {
      return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    } else {
      return null;
    }
  }

  saveData() {
    this.loading = true;

    this.entries.forEach(entry => {
      const date = this.getDate(entry.date);
      entry.departureDateTime = moment(`${date} ${entry.departureTime}`).format('YYYY-MM-DD HH:mm:ss.SSS').toString();
      entry.arrivalDateTime = moment(`${date} ${entry.arrivalTime}`).format('YYYY-MM-DD HH:mm:ss.SSS').toString();
    });

    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/google-entries/`, this.entries).subscribe(data => {
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(error);
    });
  }

}
