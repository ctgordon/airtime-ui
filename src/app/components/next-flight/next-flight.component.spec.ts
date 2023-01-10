import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextFlightComponent } from './next-flight.component';

describe('NextFlightComponent', () => {
  let component: NextFlightComponent;
  let fixture: ComponentFixture<NextFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
