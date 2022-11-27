import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRoutingModule } from './back-routing.module';
import { BackComponent } from './back.component';

import {MenuComponent} from "./menu/menu.component";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {PreloaderComponent} from "./preloader/preloader.component";
import { ConsultantGridComponent } from './consultant-grid/consultant-grid.component';
import {DataTablesModule} from "angular-datatables";
import {LoginComponent} from "../front/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConsultantEditComponent } from './consultant-edit/consultant-edit.component';
import { ConsultantAddComponent } from './consultant-add/consultant-add.component';
import {ToastModule} from 'primeng/toast';
import { ServiceConsultationGridComponent } from './service-consultation/service-consultation-grid/service-consultation-grid.component';
import { ServiceConsultationAddComponent } from './service-consultation/service-consultation-add/service-consultation-add.component';
import { ServiceConsultationEditComponent } from './service-consultation/service-consultation-edit/service-consultation-edit.component';
import { SalleAttenteGridComponent } from './SalleAttente/salle-attente-grid/salle-attente-grid.component';
import { SalleAttenteAddComponent } from './SalleAttente/salle-attente-add/salle-attente-add.component';
import { SalleAttenteEditComponent } from './SalleAttente/salle-attente-edit/salle-attente-edit.component';
import { AdminGridComponent } from './admin/admin-grid/admin-grid.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { AdminEditComponent } from './admin/admin-edit/admin-edit.component';
import { PersonnelMedicalGridComponent } from './personnel Medical/personnel-medical-grid/personnel-medical-grid.component';
import { PersonnelMedicalAddComponent } from './personnel Medical/personnel-medical-add/personnel-medical-add.component';
import { PersonnelMedicalEditComponent } from './personnel Medical/personnel-medical-edit/personnel-medical-edit.component';
import { AcceuilGridComponent } from './acceuil/acceuil-grid/acceuil-grid.component';
import { AcceuilAddComponent } from './acceuil/acceuil-add/acceuil-add.component';
import { AcceuilEditComponent } from './acceuil/acceuil-edit/acceuil-edit.component';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FlatpickrModule} from "angularx-flatpickr";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendrierComponent} from "../calendrier/calendrier/calendrier.component";
import { ExamenGridComponent } from './examen/examen-grid/examen-grid.component';
import { ExamenAddComponent } from './examen/examen-add/examen-add.component';
import { ExamenEditComponent } from './examen/examen-edit/examen-edit.component';
import { MedicamentGridComponent } from './medicament/medicament-grid/medicament-grid.component';
import { MedicamentAddComponent } from './medicament/medicament-add/medicament-add.component';
import { MedicamentEditComponent } from './medicament/medicament-edit/medicament-edit.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import { StatistiquesComponent } from './statistiques/statistiques.component';
import {LineChartModule} from "@swimlane/ngx-charts";




@NgModule({
  declarations: [
    BackComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    PreloaderComponent,
    ConsultantGridComponent,
    ConsultantEditComponent,
    ConsultantAddComponent,
    ServiceConsultationGridComponent,
    ServiceConsultationAddComponent,
    ServiceConsultationEditComponent,
    SalleAttenteGridComponent,
    SalleAttenteAddComponent,
    SalleAttenteEditComponent,
    AdminGridComponent,
    AdminAddComponent,
    AdminEditComponent,
    PersonnelMedicalGridComponent,
    PersonnelMedicalAddComponent,
    PersonnelMedicalEditComponent,
    AcceuilGridComponent,
    AcceuilAddComponent,
    AcceuilEditComponent,
    ExamenGridComponent,
    ExamenAddComponent,
    ExamenEditComponent,
    MedicamentGridComponent,
    MedicamentAddComponent,
    MedicamentEditComponent,
    StatistiquesComponent

  ],
    imports: [
        CommonModule,
        BackRoutingModule,
        HttpClientModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,

        ToastModule,
        LineChartModule,
    ]

})
export class BackModule { }
