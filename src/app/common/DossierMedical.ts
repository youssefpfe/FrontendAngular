import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";
import {Consultant} from "./Consultant";
import {ServiceConsultation} from "./ServiceConsultation";
import {Patient} from "./Patient";


export class DossierMedical
{

  id!:number;
  nomPatient!:string;
  prenomPatient!:string;
  consultationEffectuee!:string;
  resultatPrestation!:string;
  postedAt!:Date;
  lastUpdatedAt!:Date;
  patient!:Patient;
  consultant!:Consultant;
  serviceConsultation!:ServiceConsultation;



}
