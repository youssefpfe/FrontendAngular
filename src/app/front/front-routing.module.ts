import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './front.component';
import {PatientGridComponent} from "./patient/patient-grid/patient-grid.component";
import {RendezVousComponent} from "./rendezVous/rendez-vous/rendez-vous.component";
import {PatientAddComponent} from "./patient/patient-add/patient-add.component";
import {PatientEditComponent} from "./patient/patient-edit/patient-edit.component";
import {Calendrier2Component} from "../calendrier/calendrier2/calendrier2.component";
import {PatientDetailComponent} from "./patient/patient-detail/patient-detail.component";
import {DossierMedicalAddComponent} from "./dossierMedical/dossier-medical-add/dossier-medical-add.component";
import {DossierMedicalDetailsComponent} from "./dossierMedical/dossier-medical-details/dossier-medical-details.component";
import {ConsultationAddComponent} from "./consultation/consultation-add/consultation-add.component";
import {PayementAddComponent} from "./payement/payement-add/payement-add.component";
import {FactureAddComponent} from "./payement/facture-add/facture-add.component";
import {AdminGuard} from "../shared/adminGuard";
import {ServiceGuard} from "../shared/serviceGuard";
import {PaymentGuard} from "../shared/paymentGuard";
import {ConsultantGuard} from "../shared/consultantGuard";
import {FrontGuard} from "../shared/frontGuard";
import {ServpayGuard} from "../shared/servpayGuard";
import {SallePatientGridComponent} from "./sallePatients/salle-patient-grid/salle-patient-grid.component";
import {SalleattenteGuard} from "../shared/salleattenteGuard";
import {ServpayattGuard} from "../shared/servpayattGuard";
import {AssuranceGridComponent} from "./assurance/assurance-grid/assurance-grid.component";

const routes: Routes = [
  {
    path: '', component: FrontComponent,
    children: [
      {path: 'patient', component: PatientGridComponent,
        canActivate: [ServpayGuard]},
      {path: 'patient/add', component: PatientAddComponent,
        canActivate: [ServpayGuard]},
      {path: 'patient/edit/:id', component: PatientEditComponent,
        canActivate: [ServpayGuard]},
      {path: 'patient/rendezvous/:id', component: RendezVousComponent ,
        canActivate: [ServiceGuard],},
      {path: 'patient/payment/:id', component: PayementAddComponent,
        canActivate: [PaymentGuard]},
      {path: 'patient/payment/:id/:idrdv', component: FactureAddComponent,
        canActivate: [PaymentGuard]},
      {path: 'rdvs', component: Calendrier2Component,
        canActivate: [ConsultantGuard]},
      {path: 'rdvs/:id/:idR', component: PatientDetailComponent ,
        canActivate: [ConsultantGuard]},

      {path: 'rdvs/:id/:idR/ajoutdossier', component: DossierMedicalAddComponent,
        canActivate: [ConsultantGuard]},
      {path: 'rdvs/:id/:idR/:idD', component: DossierMedicalDetailsComponent,
        canActivate: [ConsultantGuard]},
      {path: 'rdvs/:id/:idR/:idD/ajoutconsultation', component: ConsultationAddComponent,
        canActivate: [ConsultantGuard]},
      {path: 'attente', component: SallePatientGridComponent,
        canActivate: [SalleattenteGuard]},
      {path: 'attente/edit/:id', component: PatientEditComponent,
        canActivate: [ServpayattGuard]},
      {path: 'assurance', component: AssuranceGridComponent,
        canActivate: [PaymentGuard]},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
