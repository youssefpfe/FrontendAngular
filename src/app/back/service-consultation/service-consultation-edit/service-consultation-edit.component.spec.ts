import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConsultationEditComponent } from './service-consultation-edit.component';

describe('ServiceConsultationEditComponent', () => {
  let component: ServiceConsultationEditComponent;
  let fixture: ComponentFixture<ServiceConsultationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceConsultationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceConsultationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
