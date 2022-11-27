import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";
import {DossierMedical} from "./DossierMedical";
import {Ordonnance} from "./Ordonnance";


export class Consultation
{

  id!:number;
  dateConsultation!:Date;
  typeConsultation!:string;
  diagnostic!:string;
  postedAt !: Date;
  lastUpdatedAt !: Date;
  dossierMedical!:DossierMedical;
  ordonnance!:Ordonnance;





}
