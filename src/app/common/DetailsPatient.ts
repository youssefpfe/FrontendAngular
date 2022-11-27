import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";
import {Patient} from "./Patient";


export class DetailsPatient
{

  id!:number;
  status !: string;
  serviceAffectation!:string;
  etatDuPatient!:string;
  heurePriseCharge!:Date;
  postedAt!:Date;
  lastUpdatedAt!:Date;
  patient!:Patient;



}
