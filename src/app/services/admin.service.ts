import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Consultant} from "../common/Consultant";
import {SignupRequestConsultant} from "../common/user/SignupRequestConsultant";
import {Utilisateur} from "../common/Utilisateur";
import {SignupRequest} from "../common/user/SignupRequest";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }


  getAdminsList(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(baseUrl + '/RELATIONSHIP-SERVICE/utilisateur/getAll',{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }



  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/utilisateur/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getAdminById(id: string|null): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(baseUrl + '/RELATIONSHIP-SERVICE/utilisateur/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editAdmin(a: Utilisateur): Observable<Utilisateur> {

    return this.httpClient.put<Utilisateur>(baseUrl + '/RELATIONSHIP-SERVICE/utilisateur/edit/Admin', a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addAdmin(a: SignupRequest): Observable<Utilisateur> {

    return this.httpClient.post<Utilisateur>(baseUrl + '/RELATIONSHIP-SERVICE/api/auth/Admin/signup', a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
}
