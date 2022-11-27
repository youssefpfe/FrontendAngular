import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ordonnance} from "../common/Ordonnance";
import {OrdonnanceRequest} from "../common/OrdonnanceRequest";
import {Facturation} from "../common/Facturation";
import {FacturationRequest} from "../common/FacturationRequest";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FacturationService {

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private httpClient: HttpClient) {
  }


  getFacturationsList(): Observable<Facturation[]> {
    return this.httpClient.get<Facturation[]>(baseUrl + '/RELATIONSHIP-SERVICE/facturation/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/facturation/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getFacturationById(id: string|null): Observable<Facturation> {
    return this.httpClient.get<Facturation>(baseUrl + '/RELATIONSHIP-SERVICE/facturation/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editOrdonnance(s: FacturationRequest): Observable<Facturation> {
    console.log(s);
    return this.httpClient.put<Facturation>(baseUrl + '/RELATIONSHIP-SERVICE/facturation/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addFacturation(s: FacturationRequest): Observable<Facturation> {
    console.log(s);
    return this.httpClient.post<Facturation>(baseUrl + '/RELATIONSHIP-SERVICE/facturation/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

}
