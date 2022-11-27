import { TestBed } from '@angular/core/testing';

import { PriseRdvService } from './prise-rdv.service';

describe('PriseRdvService', () => {
  let service: PriseRdvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriseRdvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
