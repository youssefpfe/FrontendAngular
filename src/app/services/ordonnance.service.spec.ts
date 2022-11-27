import { TestBed } from '@angular/core/testing';

import { OrdonnanceService } from './ordonnance.service';

describe('OdonnanceService', () => {
  let service: OrdonnanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdonnanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
