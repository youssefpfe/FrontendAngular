import { TestBed } from '@angular/core/testing';

import { ServiceConsultationService } from './service-consultation.service';

describe('ServiceConsultationService', () => {
  let service: ServiceConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
