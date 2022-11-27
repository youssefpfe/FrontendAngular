import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentGridComponent } from './medicament-grid.component';

describe('MedicamentGridComponent', () => {
  let component: MedicamentGridComponent;
  let fixture: ComponentFixture<MedicamentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicamentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
