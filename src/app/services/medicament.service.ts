import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Examen} from "../common/Examen";
import {ExamenRequest} from "../common/ExamenRequest";
import {MedicamentRequest} from "../common/MedicamentRequest";
import {Medicament} from "../common/Medicament";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {


  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }


  getMedicamentList(): Observable<Medicament[]> {
    return this.httpClient.get<Medicament[]>(baseUrl + '/RELATIONSHIP-SERVICE/medicament/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/medicament/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getMedicamentById(id: string|null): Observable<Medicament> {
    return this.httpClient.get<Medicament>(baseUrl + '/RELATIONSHIP-SERVICE/medicament/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editMedicament(s: Medicament): Observable<Medicament> {

    return this.httpClient.put<Medicament>(baseUrl + '/RELATIONSHIP-SERVICE/medicament/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addMedicament(s: MedicamentRequest): Observable<Medicament> {
    console.log(s);
    return this.httpClient.post<Medicament>(baseUrl + '/RELATIONSHIP-SERVICE/medicament/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }


}
