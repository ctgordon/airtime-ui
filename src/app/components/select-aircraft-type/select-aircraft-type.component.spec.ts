import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAircraftTypeComponent } from './select-aircraft-type.component';

describe('SelectAircraftTypeComponent', () => {
  let component: SelectAircraftTypeComponent;
  let fixture: ComponentFixture<SelectAircraftTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAircraftTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAircraftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
