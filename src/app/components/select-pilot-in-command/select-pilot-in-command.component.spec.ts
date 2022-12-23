import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPilotInCommandComponent } from './select-pilot-in-command.component';

describe('SelectPilotInCommandComponent', () => {
  let component: SelectPilotInCommandComponent;
  let fixture: ComponentFixture<SelectPilotInCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPilotInCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPilotInCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
