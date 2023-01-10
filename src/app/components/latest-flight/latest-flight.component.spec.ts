import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestFlightComponent } from './latest-flight.component';

describe('LatestFlightComponent', () => {
  let component: LatestFlightComponent;
  let fixture: ComponentFixture<LatestFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
