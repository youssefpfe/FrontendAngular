import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenGridComponent } from './examen-grid.component';

describe('ExamenGridComponent', () => {
  let component: ExamenGridComponent;
  let fixture: ComponentFixture<ExamenGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
