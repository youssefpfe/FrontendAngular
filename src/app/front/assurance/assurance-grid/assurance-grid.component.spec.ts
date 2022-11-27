import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceGridComponent } from './assurance-grid.component';

describe('AssuranceGridComponent', () => {
  let component: AssuranceGridComponent;
  let fixture: ComponentFixture<AssuranceGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuranceGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssuranceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
