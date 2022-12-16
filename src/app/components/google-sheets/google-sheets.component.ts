import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GoogleSheetsDbService} from "ng-google-sheets-db";
import {GoogleSheetEntry, googleSheetEntryMapping} from "../../model/google.sheet.entry";

@Component({
  selector: 'app-google-sheets',
  templateUrl: './google-sheets.component.html',
  styleUrls: ['./google-sheets.component.scss']
})
export class GoogleSheetsComponent implements OnInit {

  private sheetId: string = '1vQbGeY1oYmnoa2MSDqHSXpFIYjPlz7uapPo0eUSofo8';

  private characters$!: Observable<GoogleSheetEntry[]>

  constructor(private googleSheetsDbService: GoogleSheetsDbService) {
  }

  ngOnInit(): void {
    this.characters$ = this.googleSheetsDbService.getActive<GoogleSheetEntry>(this.sheetId, "Logbook", googleSheetEntryMapping);
    console.log(this.characters$);
  }

}
