import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelMedicalEditComponent } from './personnel-medical-edit.component';

describe('PersonnelMedicalEditComponent', () => {
  let component: PersonnelMedicalEditComponent;
  let fixture: ComponentFixture<PersonnelMedicalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelMedicalEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelMedicalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
