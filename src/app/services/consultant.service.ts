import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Consultant} from "../common/Consultant";

import {SignupRequestConsultant} from "../common/user/SignupRequestConsultant";
import {baseUrl} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) { }

  getConsultantsList(): Observable<Consultant[]> {
    return this.httpClient.get<Consultant[]>(baseUrl + '/RELATIONSHIP-SERVICE/utilisateur/Consultant/getAll',{
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

  getConsultantById(id: string|null): Observable<Consultant> {
    return this.httpClient.get<Consultant>(baseUrl + '/RELATIONSHIP-SERVICE/utilisateur/getConsultant/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editConsultant(c: Consultant): Observable<Consultant> {

    return this.httpClient.put<Consultant>(baseUrl + '/RELATIONSHIP-SERVICE/utilisateur/edit/Consultant', c,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addConsultant(c: SignupRequestConsultant): Observable<SignupRequestConsultant> {

    return this.httpClient.post<SignupRequestConsultant>(baseUrl + '/RELATIONSHIP-SERVICE/api/auth/Consultant/signup', c,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
}
