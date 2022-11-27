import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SalleAttente} from "../common/SalleAttente";
import {PriseRdv} from "../common/PriseRdv";
import {PriseRdvRequest} from "../common/PriseRdvRequest";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PriseRdvService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }



  getPriseRdvsList(): Observable<SalleAttente[]> {
    return this.httpClient.get<SalleAttente[]>(baseUrl + '/RELATIONSHIP-SERVICE/priseRDV/getAll', {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl + '/RELATIONSHIP-SERVICE/priseRDV/delete/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getPriseRdvById(id: string|null): Observable<PriseRdv> {
    return this.httpClient.get<PriseRdv>(baseUrl + '/RELATIONSHIP-SERVICE/priseRDV/get/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }
  getAllPriseRdvByConsultant(id: any): Observable<PriseRdv[]> {
    return this.httpClient.get<PriseRdv[]>(baseUrl + '/RELATIONSHIP-SERVICE/priseRDV/rdvConsultant/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }
getAllPriseRdvByPatient(id: any): Observable<PriseRdv[]> {
    return this.httpClient.get<PriseRdv[]>(baseUrl + '/RELATIONSHIP-SERVICE/priseRDV/rdvPatient/' + id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });

  }

  editPriseRdv(s: PriseRdvRequest): Observable<PriseRdv> {
    console.log(s);
    return this.httpClient.put<PriseRdv>(baseUrl + '/RELATIONSHIP-SERVICE/priseRDV/edit/'+s.id, s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
  addPriseRdv(s: PriseRdvRequest): Observable<PriseRdv> {
    console.log(s);
    return this.httpClient.post<PriseRdv>(baseUrl + '/RELATIONSHIP-SERVICE/priseRDV/add', s,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
}
