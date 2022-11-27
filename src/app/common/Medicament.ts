import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";
import {Ordonnance} from "./Ordonnance";


export class Medicament
{


  id ! : number;
  nomMedicament!:string;
  dureeDePrise!:string;
  postedAt!: Date;
  lastUpdatedAt !: Date;
  ordonnances !: Array<Ordonnance>;

}
