import {PriseRdv} from "./PriseRdv";
import {SalleAttente} from "./SalleAttente";


export class PatientRequest
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

  priseRDVs!:Array<PriseRdv>;
  salleAttenteId!:number;
  detailPatientId!:number;


}
