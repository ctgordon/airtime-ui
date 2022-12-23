import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedDropdownComponent } from './validated-dropdown.component';

describe('ValidatedDropdownComponent', () => {
  let component: ValidatedDropdownComponent;
  let fixture: ComponentFixture<ValidatedDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatedDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatedDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
