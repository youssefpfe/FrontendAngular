import {Consultant} from "./Consultant";
import {SalleAttente} from "./SalleAttente";
import {PersonnelMedical} from "./PersonnelMedical";
import {ServiceConsultation} from "./ServiceConsultation";
import {Patient} from "./Patient";
import {Examen} from "./Examen";
import {Facturation} from "./Facturation";


export class PriseRdv
{

  id!:number;


  motif!:string;
  typeService!:string;
  dateRDV !:Date ;
  heureRDV !:Date ;
  serviceConsultation!:ServiceConsultation;
   consultant!:Consultant;
   patient!:Patient;
  payed!:boolean;
  isChecked:boolean=false;
  examen!:Examen;
  facturation!:Facturation;

  lastUpdatedAt !:Date ;

  postedAt !:Date ;


}
