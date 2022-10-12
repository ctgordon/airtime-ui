import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAircraftModalComponent } from './edit-aircraft-modal.component';

describe('EditAircraftModalComponent', () => {
  let component: EditAircraftModalComponent;
  let fixture: ComponentFixture<EditAircraftModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAircraftModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAircraftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
