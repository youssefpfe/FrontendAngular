import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";


export class OrdonnanceRequest
{


  id ! : number;
  nomPatient!:string;
  dateOrdonnance!: Date;
  natureOrdonnance!:string;
  postedAt !: Date;
  lastUpdatedAt !: Date;
  consultantId !: number;
  examensId !: Array<number>;
  medicamentsId !: Array<number>;
  consultationId!:number;







}
