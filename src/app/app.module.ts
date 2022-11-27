import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from 'primeng/inputtext';
//import { HeaderComponent } from './header/header.component';
import {DataTablesModule} from 'angular-datatables';
import {BackModule} from "./back/back.module";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./front/login/login.component";
import {AuthService} from "./shared/auth/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FrontModule} from "./front/front.module";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FlatpickrModule} from "angularx-flatpickr";
import {CalendrierComponent} from "./calendrier/calendrier/calendrier.component";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {MatButtonModule} from "@angular/material/button";
import { Calendrier2Component } from './calendrier/calendrier2/calendrier2.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";

/*const appRoutes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
    ]
  },
  { path: 'login', component: MenuComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    BackModule,
    InputTextModule,
    MatButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    FrontModule,
    NgxChartsModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
