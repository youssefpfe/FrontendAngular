import {Consultant} from "./Consultant";
import {SalleAttente} from "./SalleAttente";
import {PersonnelMedical} from "./PersonnelMedical";


export class ServiceConsultation
{

  id!:number;


  nomService!:string;
  typeService!:string;

  salleAttente!:SalleAttente;
   consultants!:Array<Consultant>;
   personnelMedicals!:Array<PersonnelMedical>;

  LastUpdatedAt !:Date ;

  PostedAt !:Date ;


}
