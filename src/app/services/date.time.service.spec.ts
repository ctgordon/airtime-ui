import { TestBed } from '@angular/core/testing';

import { DateTimeService } from './date.time.service';

describe('Date.TimeService', () => {
  let service: DateTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
