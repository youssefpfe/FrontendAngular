import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back.component';

import { MenuComponent } from './menu/menu.component';
import {ConsultantGridComponent} from "./consultant-grid/consultant-grid.component";
import {ConsultantEditComponent} from "./consultant-edit/consultant-edit.component";
import {ConsultantAddComponent} from "./consultant-add/consultant-add.component";
import {ServiceConsultationGridComponent} from "./service-consultation/service-consultation-grid/service-consultation-grid.component";
import {ServiceConsultationAddComponent} from "./service-consultation/service-consultation-add/service-consultation-add.component";
import {ServiceConsultationEditComponent} from "./service-consultation/service-consultation-edit/service-consultation-edit.component";
import {SalleAttenteGridComponent} from "./SalleAttente/salle-attente-grid/salle-attente-grid.component";
import {SalleAttenteAddComponent} from "./SalleAttente/salle-attente-add/salle-attente-add.component";
import {SalleAttenteEditComponent} from "./SalleAttente/salle-attente-edit/salle-attente-edit.component";
import {AdminGridComponent} from "./admin/admin-grid/admin-grid.component";
import {AdminAddComponent} from "./admin/admin-add/admin-add.component";
import {AdminEditComponent} from "./admin/admin-edit/admin-edit.component";
import {PersonnelMedicalGridComponent} from "./personnel Medical/personnel-medical-grid/personnel-medical-grid.component";
import {PersonnelMedicalAddComponent} from "./personnel Medical/personnel-medical-add/personnel-medical-add.component";
import {PersonnelMedicalEditComponent} from "./personnel Medical/personnel-medical-edit/personnel-medical-edit.component";
import {Accueil} from "../common/Accueil";
import {AcceuilGridComponent} from "./acceuil/acceuil-grid/acceuil-grid.component";
import {AcceuilAddComponent} from "./acceuil/acceuil-add/acceuil-add.component";
import {AcceuilEditComponent} from "./acceuil/acceuil-edit/acceuil-edit.component";
import {Examen} from "../common/Examen";
import {ExamenGridComponent} from "./examen/examen-grid/examen-grid.component";
import {ExamenAddComponent} from "./examen/examen-add/examen-add.component";
import {ExamenEditComponent} from "./examen/examen-edit/examen-edit.component";
import {MedicamentGridComponent} from "./medicament/medicament-grid/medicament-grid.component";
import {MedicamentAddComponent} from "./medicament/medicament-add/medicament-add.component";
import {MedicamentEditComponent} from "./medicament/medicament-edit/medicament-edit.component";
import {StatistiquesComponent} from "./statistiques/statistiques.component";



const routes: Routes = [
  { path: '', component: BackComponent,
    children: [
      {path: 'consultant', component: ConsultantGridComponent},
      {path: 'consultant/add', component: ConsultantAddComponent},
      {path: 'consultant/edit/:id', component: ConsultantEditComponent},
      {path: 'serviceconsultation', component: ServiceConsultationGridComponent},
      {path: 'serviceconsultation/add', component: ServiceConsultationAddComponent},
      {path: 'serviceconsultation/edit/:id', component: ServiceConsultationEditComponent},
      {path: 'salleattente', component: SalleAttenteGridComponent},
      {path: 'salleattente/add', component: SalleAttenteAddComponent},
      {path: 'salleattente/edit/:id', component: SalleAttenteEditComponent},
      {path: 'admin', component: AdminGridComponent},
      {path: 'admin/add', component: AdminAddComponent},
      {path: 'admin/edit/:id', component: AdminEditComponent},
      {path: 'personnel', component: PersonnelMedicalGridComponent},
      {path: 'personnel/add', component: PersonnelMedicalAddComponent},
      {path: 'personnel/edit/:id', component: PersonnelMedicalEditComponent},
      {path: 'acceuil', component: AcceuilGridComponent},
      {path: 'acceuil/add', component: AcceuilAddComponent},
      {path: 'acceuil/edit/:id', component: AcceuilEditComponent},
      {path: 'examen', component: ExamenGridComponent},
      {path: 'examen/add', component: ExamenAddComponent},
      {path: 'examen/edit/:id', component: ExamenEditComponent},
      {path: 'medicament', component: MedicamentGridComponent},
      {path: 'medicament/add', component: MedicamentAddComponent},
      {path: 'medicament/edit/:id', component: MedicamentEditComponent},
      {path: '',component:StatistiquesComponent},






    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackRoutingModule { }
