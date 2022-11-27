import {Consultant} from "./Consultant";
import {SalleAttente} from "./SalleAttente";
import {PersonnelMedical} from "./PersonnelMedical";


export class ServiceConsultationRequest
{

  id!:number;


  nomService!:string;
  typeService!:string;

  salleAttenteId!:number;
   consultants!:Array<Consultant>;
   personnelMedicals!:Array<PersonnelMedical>;

  LastUpdatedAt !:Date ;

  PostedAt !:Date ;


}
