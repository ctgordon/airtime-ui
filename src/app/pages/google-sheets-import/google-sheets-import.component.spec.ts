import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSheetsImportComponent } from './google-sheets-import.component';

describe('GoogleSheetsImportComponent', () => {
  let component: GoogleSheetsImportComponent;
  let fixture: ComponentFixture<GoogleSheetsImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleSheetsImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSheetsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
