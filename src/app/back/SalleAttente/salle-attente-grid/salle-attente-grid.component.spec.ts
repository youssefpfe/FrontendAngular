import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleAttenteGridComponent } from './salle-attente-grid.component';

describe('SalleAttenteGridComponent', () => {
  let component: SalleAttenteGridComponent;
  let fixture: ComponentFixture<SalleAttenteGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalleAttenteGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalleAttenteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
