import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleAttenteEditComponent } from './salle-attente-edit.component';

describe('SalleAttenteEditComponent', () => {
  let component: SalleAttenteEditComponent;
  let fixture: ComponentFixture<SalleAttenteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalleAttenteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalleAttenteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
