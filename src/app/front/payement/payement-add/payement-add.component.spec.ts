import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementAddComponent } from './payement-add.component';

describe('PayementAddComponent', () => {
  let component: PayementAddComponent;
  let fixture: ComponentFixture<PayementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
