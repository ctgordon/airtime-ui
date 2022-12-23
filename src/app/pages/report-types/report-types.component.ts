import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Subscription} from "rxjs";
import {ReportType} from "../../model/report.type";
import {MatSort} from "@angular/material/sort";
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
    {id: 'id', title: 'ID', hidden: false},
    {id: 'name', title: 'Name', hidden: false},
    {id: 'inUse', title: 'inUse', hidden: false},
  ];
  public dataSource!: MatTableDataSource<ReportType>;

  constructor(private httpService: HttpService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getReportTypes();

    this.genericForm.dialogTitle = 'Report types';
    this.genericForm.formGroup = new FormGroup({});
    this.genericForm.formGroup.addControl('id', this.reportTypeForm.id);
    this.genericForm.formGroup.addControl('name', this.reportTypeForm.name);
    this.genericForm.formGroup.addControl('inUse', this.reportTypeForm.inUse);

    this.genericForm.controls = [
      new GenericFormElementProperties('name', 'Name', 'text', this.reportTypeForm.name, 12),
      new GenericFormElementProperties('inUse', 'In use', 'switch', this.reportTypeForm.inUse, 12)
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
