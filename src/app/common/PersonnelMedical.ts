import {ServiceConsultation} from "./ServiceConsultation";
import {SalleAttente} from "./SalleAttente";
import {Accueil} from "./Accueil";


export class PersonnelMedical
{

  id!:number;

   nom!:string;



   prenom!:string;



   username!:string;


  // password!:string;


   email!:string;


   telephone!:string;


   photo!:string;

   roles!:Array<string>;

   calendrier!:string;

   titre!:string;

   fonction!:string;

   service!:string;

   accueil!:Accueil;

   salleAttente!:SalleAttente;

   serviceConsultation!:ServiceConsultation ;

   LastUpdatedAt!:Date ;

   PostedAt !:Date ;

}
