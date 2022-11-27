import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Consultant} from "../common/Consultant";
import {SignupRequestConsultant} from "../common/user/SignupRequestConsultant";
import {Consultation} from "../common/Consultation";
import {ConsultationRequest} from "../common/ConsultationRequest";
import {Ordonnance} from "../common/Ordonnance";
import {OrdonnanceRequest} from "../common/OrdonnanceRequest";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }


  getOrdonnancesList(): Observable<Ordonnance[]> {
    return this.httpClient.get<Ordonnance[]>(baseUrl + '/RELATIONSHIP-SERVICE/ordonnance/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/ordonnance/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getOrdonnanceById(id: string|null): Observable<Ordonnance> {
    return this.httpClient.get<Ordonnance>(baseUrl + '/RELATIONSHIP-SERVICE/ordonnance/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editOrdonnance(s: OrdonnanceRequest): Observable<Ordonnance> {
    console.log(s);
    return this.httpClient.put<Ordonnance>(baseUrl + '/RELATIONSHIP-SERVICE/ordonnance/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addOrdonnance(s: OrdonnanceRequest): Observable<Ordonnance> {
    console.log(s);
    return this.httpClient.post<Ordonnance>(baseUrl + '/RELATIONSHIP-SERVICE/ordonnance/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

}
