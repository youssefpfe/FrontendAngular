import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Examen} from "../common/Examen";
import {ExamenRequest} from "../common/ExamenRequest";
import {DossierMedical} from "../common/DossierMedical";
import {DossierMedicalRequest} from "../common/DossierMedicalRequest";
//import {baseUrl} from "../../environments/environment";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {


  baseUrl=environment.baseUrl;

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }


  getDossierMedicalList(): Observable<DossierMedical[]> {
    return this.httpClient.get<DossierMedical[]>(this.baseUrl  + '/RELATIONSHIP-SERVICE/dossierMedical/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  getPatientDossierMedicalList(id: any): Observable<DossierMedical[]> {
    return this.httpClient.get<DossierMedical[]>(this.baseUrl  + '/RELATIONSHIP-SERVICE/dossierMedical/patientdossiers/'+ id, {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(this.baseUrl  + '/RELATIONSHIP-SERVICE/dossierMedical/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getDossierMedicalById(id: string|null): Observable<DossierMedical> {
    return this.httpClient.get<DossierMedical>(this.baseUrl  + '/RELATIONSHIP-SERVICE/dossierMedical/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editDossierMedical(s: DossierMedicalRequest): Observable<DossierMedical> {
    console.log(s);
    return this.httpClient.put<DossierMedical>(this.baseUrl  + '/RELATIONSHIP-SERVICE/dossierMedical/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addDossierMedical(s: DossierMedicalRequest): Observable<DossierMedical> {
    console.log(s);
    return this.httpClient.post<DossierMedical>(this.baseUrl  + '/RELATIONSHIP-SERVICE/dossierMedical/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }


}
