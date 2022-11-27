import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./front/login/login.component";
import {AdminGuard} from "./shared/adminGuard";
import {ServiceGuard} from "./shared/serviceGuard";
import {PaymentGuard} from "./shared/paymentGuard";
import {FrontGuard} from "./shared/frontGuard";


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  { path: 'back', loadChildren: () => import('./back/back.module').then(m => m.BackModule),
  canActivate: [AdminGuard]}, //a suprimer canActivate Pour premier admin
  { path: 'front', loadChildren: () => import('./front/front.module').then(m => m.FrontModule),
    canActivate: [FrontGuard]},

  {path:'**',redirectTo:'login'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
