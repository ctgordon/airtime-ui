import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() displayedColumns!: Array<{ id: string, title: string, hidden: boolean }>;
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() rawData!: Array<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public columnDefinitions: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.displayedColumns.forEach(col => this.columnDefinitions.push(col.id));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  output(dataSet: any) {
    this.emitter.emit(dataSet);
  }
}
