import { TestBed } from '@angular/core/testing';

import { SalleAttenteService } from './salle-attente.service';

describe('SalleAttenteService', () => {
  let service: SalleAttenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalleAttenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
