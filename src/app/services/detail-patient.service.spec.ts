import { TestBed } from '@angular/core/testing';

import { DetailPatientService } from './detail-patient.service';

describe('DetailPatientService', () => {
  let service: DetailPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
