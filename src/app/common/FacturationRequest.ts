import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";


export class FacturationRequest
{

id!:number;
  nomPatient!:string;
  codeFacture!:string;
  montantAPayer!:number;
  montantPaye!:number;
  typePaiement!:string;
  dateFacture!:Date;
  sommeRecue!:number;
  sommeRendue!:number;
  nomAgent!:string;
  postedAt!:Date;
  lastUpdatedAt!:Date;
  paiementId!:number;
  examenId!:number;
  priseRDVId!:number;




}
