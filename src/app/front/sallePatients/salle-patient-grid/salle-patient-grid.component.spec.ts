import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallePatientGridComponent } from './salle-patient-grid.component';

describe('SallePatientGridComponent', () => {
  let component: SallePatientGridComponent;
  let fixture: ComponentFixture<SallePatientGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SallePatientGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SallePatientGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
