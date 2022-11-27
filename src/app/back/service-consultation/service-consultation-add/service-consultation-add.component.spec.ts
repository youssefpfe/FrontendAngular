import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConsultationAddComponent } from './service-consultation-add.component';

describe('ServiceConsultationAddComponent', () => {
  let component: ServiceConsultationAddComponent;
  let fixture: ComponentFixture<ServiceConsultationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceConsultationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceConsultationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
