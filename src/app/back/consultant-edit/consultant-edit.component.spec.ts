import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEditComponent } from './consultant-edit.component';

describe('ConsultantEditComponent', () => {
  let component: ConsultantEditComponent;
  let fixture: ComponentFixture<ConsultantEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
