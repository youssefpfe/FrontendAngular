import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentAddComponent } from './medicament-add.component';

describe('MedicamentAddComponent', () => {
  let component: MedicamentAddComponent;
  let fixture: ComponentFixture<MedicamentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicamentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
