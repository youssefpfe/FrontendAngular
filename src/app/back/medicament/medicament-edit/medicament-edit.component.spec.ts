import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentEditComponent } from './medicament-edit.component';

describe('MedicamentEditComponent', () => {
  let component: MedicamentEditComponent;
  let fixture: ComponentFixture<MedicamentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicamentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
