import {Consultant} from "./Consultant";
import {PersonnelMedical} from "./PersonnelMedical";
import {ServiceConsultation} from "./ServiceConsultation";


export class ExamenRequest
{


id!:number;
  nomExamen!:string;
  prixExamen!:number;
  lastUpdatedAt!:Date ;
  postedAt !:Date ;
  ordonnanceId !: number;



}
