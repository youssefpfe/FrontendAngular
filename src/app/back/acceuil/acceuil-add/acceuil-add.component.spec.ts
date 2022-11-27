import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilAddComponent } from './acceuil-add.component';

describe('AcceuilAddComponent', () => {
  let component: AcceuilAddComponent;
  let fixture: ComponentFixture<AcceuilAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
