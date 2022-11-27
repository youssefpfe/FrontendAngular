import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";
import {Consultant} from "./Consultant";
import {Examen} from "./Examen";
import {Medicament} from "./Medicament";
import {Consultation} from "./Consultation";


export class Ordonnance
{


  id ! : number;
  nomPatient!:string;
  dateOrdonnance!: Date;
  natureOrdonnance!:string;
  postedAt !: Date;
  lastUpdatedAt !: Date;
  consultant !: Consultant;
  examens !:Array<Examen>;
  medicaments!:Array<Medicament>;
  consultation!:Consultation;







}
