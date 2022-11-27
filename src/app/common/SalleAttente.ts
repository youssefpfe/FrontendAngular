import {Consultant} from "./Consultant";
import {PersonnelMedical} from "./PersonnelMedical";
import {ServiceConsultation} from "./ServiceConsultation";


export class SalleAttente
{

  id!:number;

  nom!:string;

  etage!:string;

  numOrdre!:number;

  serviceConsultations!:Array<ServiceConsultation> ;

   personnelMedicals!:Array<PersonnelMedical>;

  lastUpdatedAt!:Date ;

  postedAt !:Date ;


}
