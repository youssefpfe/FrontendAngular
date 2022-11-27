import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelMedicalGridComponent } from './personnel-medical-grid.component';

describe('PersonnelMedicalGridComponent', () => {
  let component: PersonnelMedicalGridComponent;
  let fixture: ComponentFixture<PersonnelMedicalGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelMedicalGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelMedicalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
