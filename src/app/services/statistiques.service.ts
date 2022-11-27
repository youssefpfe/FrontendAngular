import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Consultation} from "../common/Consultation";
import {SignupRequestConsultant} from "../common/user/SignupRequestConsultant";
import {Utilisateur} from "../common/Utilisateur";
import {SignupRequest} from "../common/user/SignupRequest";
import {PriseRdv} from "../common/PriseRdv";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})


export class StatistiqueService{
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }

  getCountAssuree():Observable<any>{
    return this.httpClient.get(baseUrl + '/RELATIONSHIP-SERVICE/Patient/getCount',{
      withCredentials:true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getConsultationsByServices():Observable<any[]>{
    return this.httpClient.get<any[]>(baseUrl + '/RELATIONSHIP-SERVICE/consultation/getByServices',{
      withCredentials:true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }
  getConsultationsByDates(d1:any,d2:any):Observable<any[]>{
    return this.httpClient.get<any[]>(baseUrl + '/RELATIONSHIP-SERVICE/consultation/getByDates/'+d1+'/'+d2,{
      withCredentials:true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }

  getPriseRDVSByDates(d1:any,d2:any):Observable<PriseRdv[]>{
    return this.httpClient.get<PriseRdv[]>(baseUrl + '/RELATIONSHIP-SERVICE/priseRDV/getByDates/'+d1+'/'+d2,{
      withCredentials:true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    })
  }
}
