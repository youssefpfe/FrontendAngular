import { TestBed } from '@angular/core/testing';

import { PersonnelMedicalService } from './personnel-medical.service';

describe('PersonnelMedicalService', () => {
  let service: PersonnelMedicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnelMedicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
