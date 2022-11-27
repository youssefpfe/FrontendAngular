import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SalleAttente} from "../common/SalleAttente";
import {Accueil} from "../common/Accueil";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AcceuilService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }

  getAcceuilList(): Observable<Accueil[]> {
    return this.httpClient.get<Accueil[]>(baseUrl + '/RELATIONSHIP-SERVICE/acceuil/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/acceuil/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getAcceuilById(id: string|null): Observable<Accueil> {
    return this.httpClient.get<Accueil>(baseUrl + '/RELATIONSHIP-SERVICE/acceuil/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editAcceuil(a: Accueil): Observable<Accueil> {

    return this.httpClient.put<Accueil>(baseUrl + '/RELATIONSHIP-SERVICE/acceuil/edit/'+a.id, a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addAcceuil(a: Accueil): Observable<Accueil> {

    return this.httpClient.post<Accueil>(baseUrl + '/RELATIONSHIP-SERVICE/acceuil/add', a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
}
