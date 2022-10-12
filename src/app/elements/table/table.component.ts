import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableConfig} from "../../model/table.config";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() config!: TableConfig;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  output(dataSet: any) {
    this.emitter.emit(dataSet);
  }
}
