import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";
import {Examen} from "./Examen";


export class Facturation
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
  nomAgent!:string
  postedAt!:Date;
  lastUpdatedAt!:Date;
  paiementName!:string;
  examen!: Examen;
  priseRDV!:PriseRdv;




}
