import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelMedicalAddComponent } from './personnel-medical-add.component';

describe('PersonnelMedicalAddComponent', () => {
  let component: PersonnelMedicalAddComponent;
  let fixture: ComponentFixture<PersonnelMedicalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelMedicalAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelMedicalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
