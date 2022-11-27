import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationRequest} from "../../common/user/AuthenticationRequest";
import {BehaviorSubject, Observable} from "rxjs";
import {Utilisateur} from "../../common/Utilisateur";
import {baseUrl} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile:BehaviorSubject<Utilisateur> = new BehaviorSubject<Utilisateur>({
    email: '',
    nom: '',
    id: 0,
    prenom: '',
    telephone: '',
    roles:[''],
    photo:'',
    username:''
  });
uservalue:BehaviorSubject<Utilisateur> = new BehaviorSubject<Utilisateur>(JSON.parse(localStorage.getItem('user-profile')!));

  constructor(private http: HttpClient) { }

  login(c: AuthenticationRequest):Observable<Utilisateur>  {

    return this.http.post<Utilisateur>(baseUrl + '/RELATIONSHIP-SERVICE/api/auth/signin', c,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  profile(id:any): Observable<Utilisateur> {
   /* console.log(this.http.get<Utilisateur>('http://localhost:8080/utilisateur/get/'+id, {
      withCredentials: true,
    }));*/
    return this.http.get<Utilisateur>(baseUrl + '/RELATIONSHIP-SERVICE/utilisateur/get/'+id, {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  saveUserToLocalStorage(u: Utilisateur) {

    this.userProfile.next(u);
    //console.log(this.userProfile);
    window.localStorage.setItem('user-profile', JSON.stringify(u));
  }


  loadUserFromLocalStorage(): Utilisateur {
    if (this.userProfile.value.id == 0) {
      let fromLocalStorage = localStorage.getItem('user-profile');
      if (fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }

  logout(){
    localStorage.removeItem('user-profile');
    return this.http.post(baseUrl + '/RELATIONSHIP-SERVICE/api/auth/signout',{},{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }


  get isAdminIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    return !!user.roles.includes("ROLE_ADMIN");

  }

  get isUserIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    return !!user.roles.includes("ROLE_USER");

  }

  get isAcceuilIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    if(user.roles.includes("ROLE_ACCEUIL")){
    return true;
    }
    return false;
  }

  get isAttentIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    if(user.roles.includes("ROLE_ATTENTE")){
    return true;
    }
    return false;
  }

  get isServiceIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    if(user.roles.includes("ROLE_SERVICECONSULTATION")){
    return true;
    }
    return false;
  }

  get isPaymentIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    if(user.roles.includes("ROLE_PAIEMENT")){
    return true;
    }
    return false;
  }

  get isConfigurationIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    if(user.roles.includes("ROLE_CONFIGURATION")){
    return true;
    }
    return false;
  }

  get isPriseIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    if(user.roles.includes("ROLE_PRISERDV")){
    return true;
    }
    return false;
  }

get isConsultantIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    if(user.roles.includes("ROLE_CONSULTANT")){
    return true;
    }
    return false;
  }

get isDashbordIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    if(user.roles.includes("Role_DASHBORD")){
    return true;
    }
    return false;
  }



}
