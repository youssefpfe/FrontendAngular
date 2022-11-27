import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceViewComponent } from './ordonnance-view.component';

describe('OrdonnanceViewComponent', () => {
  let component: OrdonnanceViewComponent;
  let fixture: ComponentFixture<OrdonnanceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdonnanceViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
