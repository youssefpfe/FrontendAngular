import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilGridComponent } from './acceuil-grid.component';

describe('AcceuilGridComponent', () => {
  let component: AcceuilGridComponent;
  let fixture: ComponentFixture<AcceuilGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
