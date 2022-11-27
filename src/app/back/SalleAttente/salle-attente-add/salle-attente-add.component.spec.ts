import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleAttenteAddComponent } from './salle-attente-add.component';

describe('SalleAttenteAddComponent', () => {
  let component: SalleAttenteAddComponent;
  let fixture: ComponentFixture<SalleAttenteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalleAttenteAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalleAttenteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
