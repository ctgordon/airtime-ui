import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Subscription} from "rxjs";
import {ReportType} from "../../model/report.type";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {GenericFormComponent} from "../../dialogs/generic-form/generic-form.component";
import {GenericFormProperties} from "../../model/generic.form.properties";
import {FormGroup} from "@angular/forms";
import {ReportTypeForm} from "../../forms/report.type.form";
import {GenericFormElementProperties} from "../../model/generic.form.element.properties";

@Component({
  selector: 'app-report-types',
  templateUrl: './report-types.component.html',
  styleUrls: ['./report-types.component.scss']
})
export class ReportTypesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  private reportTypeSubscription!: Subscription;

  public reportTypes!: ReportType[];
  public loading: boolean = true;
  public genericForm: GenericFormProperties = new GenericFormProperties();
  public reportTypeForm: ReportTypeForm = new ReportTypeForm();

  public displayedColumns = [
    {id: 'id', title: 'ID'},
    {id: 'name', title: 'Name'},
    {id: 'inUse', title: 'inUse'},
  ];
  public dataSource!: MatTableDataSource<ReportType>;

  constructor(private httpService: HttpService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getReportTypes();

    this.genericForm.dialogTitle = 'Report types';
    this.genericForm.formGroup = new FormGroup({});
    this.genericForm.formGroup.addControl('id', this.reportTypeForm.id);
    this.genericForm.formGroup.addControl('name', this.reportTypeForm.name);
    this.genericForm.formGroup.addControl('inUse', this.reportTypeForm.inUse);

    this.genericForm.controls = [
      new GenericFormElementProperties('name', 'Name', 'text', this.reportTypeForm.name, 12, [], null, ''),
      new GenericFormElementProperties('inUse', 'In use', 'switch', this.reportTypeForm.inUse, 12, [], null, '')
    ];
  }

  getReportTypes(): void {
    this.reportTypeSubscription = this.httpService.getReportTypes().subscribe({
      next: (data) => {
        this.reportTypes = data;
        this.dataSource = new MatTableDataSource(this.reportTypes);
        this.loading = false;
      },
      complete: () => {

      },
      error: () => {
        this.loading = false;
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(reportType: ReportType): void {

    this.reportTypeForm.id.patchValue(reportType.id);
    this.reportTypeForm.name.patchValue(reportType.name);
    this.reportTypeForm.inUse.patchValue(reportType.inUse);

    const dialogRef = this.dialog.open(GenericFormComponent, {
      data: this.genericForm,
      width: '75vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnDestroy() {
    if (typeof this.reportTypeSubscription !== "undefined") {
      this.reportTypeSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    if (typeof this.dataSource !== "undefined") {
      this.dataSource.sort = this.sort;
    }
  }
}
