import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceConsultation} from "../common/ServiceConsultation";
import {SalleAttente} from "../common/SalleAttente";
import {ServiceConsultationRequest} from "../common/ServiceConsultationRequest";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SalleAttenteService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }


  getSallesList(): Observable<SalleAttente[]> {
    return this.httpClient.get<SalleAttente[]>(baseUrl + '/RELATIONSHIP-SERVICE/salleAttente/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/salleAttente/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getSalleById(id: string|null): Observable<SalleAttente> {
    return this.httpClient.get<SalleAttente>(baseUrl + '/RELATIONSHIP-SERVICE/salleAttente/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editSalle(s: SalleAttente): Observable<SalleAttente> {

    return this.httpClient.put<SalleAttente>(baseUrl + '/RELATIONSHIP-SERVICE/salleAttente/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addSalle(s: SalleAttente): Observable<SalleAttente> {
    console.log(s);
    return this.httpClient.post<SalleAttente>(baseUrl + '/RELATIONSHIP-SERVICE/salleAttente/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

}
