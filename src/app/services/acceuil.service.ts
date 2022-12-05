import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SalleAttente} from "../common/SalleAttente";
import {Accueil} from "../common/Accueil";
//import {baseUrl} from "../../environments/environment";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AcceuilService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }
  baseUrl=environment.baseUrl;
  getAcceuilList(): Observable<Accueil[]> {
    return this.httpClient.get<Accueil[]>(this.baseUrl + '/RELATIONSHIP-SERVICE/acceuil/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(this.baseUrl + '/RELATIONSHIP-SERVICE/acceuil/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getAcceuilById(id: string|null): Observable<Accueil> {
    return this.httpClient.get<Accueil>(this.baseUrl + '/RELATIONSHIP-SERVICE/acceuil/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editAcceuil(a: Accueil): Observable<Accueil> {

    return this.httpClient.put<Accueil>(this.baseUrl + '/RELATIONSHIP-SERVICE/acceuil/edit/'+a.id, a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addAcceuil(a: Accueil): Observable<Accueil> {

    return this.httpClient.post<Accueil>(this.baseUrl + '/RELATIONSHIP-SERVICE/acceuil/add', a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
}
