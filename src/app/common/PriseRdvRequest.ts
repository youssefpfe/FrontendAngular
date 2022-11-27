import {Consultant} from "./Consultant";
import {SalleAttente} from "./SalleAttente";
import {PersonnelMedical} from "./PersonnelMedical";
import {ServiceConsultation} from "./ServiceConsultation";


export class PriseRdvRequest
{

  id!:number;


  motif!:string;
  typeService!:string;
  dateRDV !:Date ;
  heureRDV !:Date ;
  serviceconsultationId!:number;
   consultantId!:number;
   patientId!:number;
  examenId!:number;
  payed!:boolean;


  lastUpdatedAt !:Date ;

  postedAt !:Date ;


}
