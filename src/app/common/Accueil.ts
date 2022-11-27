import {Consultant} from "./Consultant";
import {PersonnelMedical} from "./PersonnelMedical";
import {ServiceConsultation} from "./ServiceConsultation";


export class Accueil
{

  id!:number;
  nom!:string;
  personnelMedicals!:Array<PersonnelMedical>;

  LastUpdatedAt!:Date ;

  PostedAt !:Date ;



}
