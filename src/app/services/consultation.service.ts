import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Consultant} from "../common/Consultant";
import {SignupRequestConsultant} from "../common/user/SignupRequestConsultant";
import {DetailsPatient} from "../common/DetailsPatient";
import {DetailsPatientRequest} from "../common/DetailsPatientRequest";
import {Consultation} from "../common/Consultation";
import {ConsultationRequest} from "../common/ConsultationRequest";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }


  getConsultationsList(): Observable<Consultation[]> {
    return this.httpClient.get<Consultation[]>(baseUrl + '/RELATIONSHIP-SERVICE/consultation/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  getConsultationsByDossier(id:any): Observable<Consultation[]> {
    return this.httpClient.get<Consultation[]>(baseUrl + '/RELATIONSHIP-SERVICE/consultation/getAll/'+id, {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/consultation/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getConsultationById(id: string|null): Observable<Consultation> {
    return this.httpClient.get<Consultation>(baseUrl + '/RELATIONSHIP-SERVICE/consultation/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editConsultation(s: ConsultationRequest): Observable<Consultation> {
    console.log(s);
    return this.httpClient.put<Consultation>(baseUrl + '/RELATIONSHIP-SERVICE/consultation/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addConsultation(s: ConsultationRequest): Observable<Consultation> {
    console.log(s);
    return this.httpClient.post<Consultation>(baseUrl + '/RELATIONSHIP-SERVICE/consultation/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }


}
