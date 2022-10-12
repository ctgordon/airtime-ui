import {Component, Input, OnInit} from '@angular/core';
import {TableConfig} from "../../model/table.config";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() config!: TableConfig;

  constructor() {
  }

  ngOnInit(): void {
  }

}
