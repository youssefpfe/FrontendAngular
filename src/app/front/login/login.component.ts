import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth/auth.service";
import {AuthenticationRequest} from "../../common/user/AuthenticationRequest";
import {Utilisateur} from "../../common/Utilisateur";
import {switchMap} from "rxjs";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {

  loginUser:AuthenticationRequest=new AuthenticationRequest();


  constructor(private auth: AuthService,private route : Router,private messageService:MessageService) { }

  ngOnInit(): void {

  }


  login() {
    let authFlow = this.auth
      .login(this.loginUser);
     // .pipe(switchMap((e) => this.auth.profile(e.id)));

    authFlow.subscribe({
      next: (user: Utilisateur) => {

        this.auth.saveUserToLocalStorage(user);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Bienvenue'});

        if(this.auth.isAdminIn) {
          this.route.navigate(['back']);
        }
        if(this.auth.isPaymentIn || this.auth.isServiceIn || this.auth.isPriseIn) {
          this.route.navigate(['front/patient']);
        }
        if(this.auth.isConsultantIn) {
          this.route.navigate(['front/rdvs']);
        }
        if(this.auth.isAttentIn) {
          this.route.navigate(['front/attente']);
        }

      },
      error: (error) => {
        this.messageService.add({severity:'error', summary: 'Error!', detail: 'Username ou Password Erroné '});

       setTimeout(()=>{
        window.location.reload();
       },2000);
      },
    });
  }






  /*login() {
    console.log(this.loginUser);
    this.auth.login(this.loginUser).subscribe({
      next: () => {
        alert('login successful');
      },
      error: (error) => {
        alert('login failed');
      },
    });
  }*/


}
