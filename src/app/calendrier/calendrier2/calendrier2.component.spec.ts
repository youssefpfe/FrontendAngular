import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendrier2Component } from './calendrier2.component';

describe('Calendrier2Component', () => {
  let component: Calendrier2Component;
  let fixture: ComponentFixture<Calendrier2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calendrier2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calendrier2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
