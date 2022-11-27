import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";
import {DetailsPatient} from "./DetailsPatient";
import {DossierMedical} from "./DossierMedical";


export class Patient
{

  id!:number;

   nom!:string;



   prenom!:string;



   genre!:string;


  // password!:string;


   email!:string;


  dateNaissance!:Date;


   photo!:string;
  domicile!:string;
  assurance!:string;
  numAffeliation!:string;
  numIdendite!:number;
  estAssure!:boolean;
  tauxAssurance!:number;
  lastUpdatedAt !:Date ;

  postedAt !:Date ;


  priseRDVs!:Array<PriseRdv>;
  salleAttente!:SalleAttente;
  detailsPatient!:DetailsPatient;
  dossierMedical!:Array<DossierMedical>;


}
