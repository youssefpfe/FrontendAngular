import {Consultant} from "./Consultant";
import {PersonnelMedical} from "./PersonnelMedical";
import {ServiceConsultation} from "./ServiceConsultation";
import {Ordonnance} from "./Ordonnance";
import {PriseRdv} from "./PriseRdv";


export class Examen
{

  id!:number;

  nomExamen!:string;
  prixExamen!:number;
  lastUpdatedAt!:Date ;
  postedAt !:Date ;
  ordonnances!:Array<Ordonnance>;
  priseRDVs!:Array<PriseRdv>;



}
