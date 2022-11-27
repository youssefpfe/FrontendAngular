import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierMedicalAddComponent } from './dossier-medical-add.component';

describe('DossierMedicalAddComponent', () => {
  let component: DossierMedicalAddComponent;
  let fixture: ComponentFixture<DossierMedicalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierMedicalAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierMedicalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
