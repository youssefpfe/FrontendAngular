import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Patient} from "../common/Patient";
import {PatientRequest} from "../common/PatientRequest";
import {DetailsPatient} from "../common/DetailsPatient";
import {DetailsPatientRequest} from "../common/DetailsPatientRequest";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetailPatientService {

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }


  getPatientsList(): Observable<DetailsPatient[]> {
    return this.httpClient.get<DetailsPatient[]>(baseUrl + '/RELATIONSHIP-SERVICE/detailsPatient/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/detailsPatient/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getPatientById(id: string|null): Observable<DetailsPatient> {
    return this.httpClient.get<DetailsPatient>(baseUrl + '/RELATIONSHIP-SERVICE/detailsPatient/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editPatient(s: DetailsPatientRequest): Observable<DetailsPatient> {
    console.log(s);
    return this.httpClient.put<DetailsPatient>(baseUrl + '/RELATIONSHIP-SERVICE/detailsPatient/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addPatient(s: DetailsPatientRequest): Observable<DetailsPatient> {
    console.log(s);
    return this.httpClient.post<DetailsPatient>(baseUrl + '/RELATIONSHIP-SERVICE/detailsPatient/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
}
