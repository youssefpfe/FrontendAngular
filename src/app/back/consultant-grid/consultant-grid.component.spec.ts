import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantGridComponent } from './consultant-grid.component';

describe('ConsultantGridComponent', () => {
  let component: ConsultantGridComponent;
  let fixture: ComponentFixture<ConsultantGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
