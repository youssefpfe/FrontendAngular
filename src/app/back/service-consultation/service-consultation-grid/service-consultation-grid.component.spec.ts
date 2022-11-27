import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConsultationGridComponent } from './service-consultation-grid.component';

describe('ServiceConsultationGridComponent', () => {
  let component: ServiceConsultationGridComponent;
  let fixture: ComponentFixture<ServiceConsultationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceConsultationGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceConsultationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
