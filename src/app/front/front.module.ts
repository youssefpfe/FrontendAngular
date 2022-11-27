import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from './front.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FlatpickrModule} from "angularx-flatpickr";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendrierComponent} from "../calendrier/calendrier/calendrier.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PatientGridComponent } from './patient/patient-grid/patient-grid.component';
import { RendezVousComponent } from './rendezVous/rendez-vous/rendez-vous.component';
import {HttpClientModule} from "@angular/common/http";

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { PatientAddComponent } from './patient/patient-add/patient-add.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';

import { MatButtonModule } from '@angular/material/button'
import {InputTextModule} from "primeng/inputtext";
import {Calendrier2Component} from "../calendrier/calendrier2/calendrier2.component";
import { PatientDetailComponent } from './patient/patient-detail/patient-detail.component';

import { DossierMedicalAddComponent } from './dossierMedical/dossier-medical-add/dossier-medical-add.component';
import { DossierMedicalDetailsComponent } from './dossierMedical/dossier-medical-details/dossier-medical-details.component';
import { ConsultationAddComponent } from './consultation/consultation-add/consultation-add.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { PayementAddComponent } from './payement/payement-add/payement-add.component';
import { FactureAddComponent } from './payement/facture-add/facture-add.component';
import { SallePatientGridComponent } from './sallePatients/salle-patient-grid/salle-patient-grid.component';
import { OrdonnanceViewComponent } from './ordonnance/ordonnance-view/ordonnance-view.component';
import { AssuranceGridComponent } from './assurance/assurance-grid/assurance-grid.component';


@NgModule({
  declarations: [
    FrontComponent,
    NavbarComponent,
    CalendrierComponent,
    Calendrier2Component,
    PatientGridComponent,
    RendezVousComponent,
    PatientAddComponent,
    PatientEditComponent,
    PatientDetailComponent,
    DossierMedicalAddComponent,
    DossierMedicalDetailsComponent,
    ConsultationAddComponent,
    PayementAddComponent,
    FactureAddComponent,
    SallePatientGridComponent,
    OrdonnanceViewComponent,
    AssuranceGridComponent
  ],
    imports: [
        CommonModule,
        FrontRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MessagesModule,
        MessageModule,
        InputTextModule,
        ToastModule,

        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        NgMultiSelectDropDownModule,
    ]
})
export class FrontModule { }
