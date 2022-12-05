import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SalleAttente} from "../common/SalleAttente";
import {Patient} from "../common/Patient";
import {PatientRequest} from "../common/PatientRequest";
//import {baseUrl} from "../../environments/environment";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl=environment.baseUrl;

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }


  getPatientsList(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.baseUrl  + '/RELATIONSHIP-SERVICE/Patient/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(this.baseUrl  + '/RELATIONSHIP-SERVICE/Patient/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getPatientById(id: string|null): Observable<Patient> {
    return this.httpClient.get<Patient>(this.baseUrl  + '/RELATIONSHIP-SERVICE/Patient/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  getPatientBySalleId(id: any): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.baseUrl  + '/RELATIONSHIP-SERVICE/Patient/getAllBySalle/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editPatient(s: PatientRequest): Observable<Patient> {
    console.log(s);
    return this.httpClient.put<Patient>(this.baseUrl  + '/RELATIONSHIP-SERVICE/Patient/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addPatient(s: PatientRequest): Observable<Patient> {
    console.log(s);
    return this.httpClient.post<Patient>(this.baseUrl  + '/RELATIONSHIP-SERVICE/Patient/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })

    });
  }
}
