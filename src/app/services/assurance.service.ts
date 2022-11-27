import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Accueil} from "../common/Accueil";
import {baseUrl} from "../../environments/environment";
import {Assurance} from "../common/Assurance";

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }

  getAssuranceList(): Observable<Assurance[]> {
    return this.httpClient.get<Assurance[]>(baseUrl + '/ASSURANCE-SERVICE/assurance/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
getAssuranceListByDates(d1:any,d2:any): Observable<Assurance[]> {
    return this.httpClient.get<Assurance[]>(baseUrl + '/ASSURANCE-SERVICE/assurance/getByDates/'+d1+"/"+d2, {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/ASSURANCE-SERVICE/assurance/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }
deleteAll() {
    return this.httpClient.delete<string>(baseUrl + '/ASSURANCE-SERVICE/assurance/deleteAll',{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getAssuranceById(id: any): Observable<Assurance> {
    return this.httpClient.get<Assurance>(baseUrl + '/ASSURANCE-SERVICE/assurance/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editAssurance(a: Assurance): Observable<Assurance> {

    return this.httpClient.put<Assurance>(baseUrl + '/ASSURANCE-SERVICE/assurance/edit/'+a.id, a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addAssurance(a: Assurance): Observable<Assurance> {

    return this.httpClient.post<Assurance>(baseUrl + '/ASSURANCE-SERVICE/assurance/add', a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }


}
