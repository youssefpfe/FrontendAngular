import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilEditComponent } from './acceuil-edit.component';

describe('AcceuilEditComponent', () => {
  let component: AcceuilEditComponent;
  let fixture: ComponentFixture<AcceuilEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
