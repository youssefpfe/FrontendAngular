import {SalleAttente} from "../SalleAttente";
import {ServiceConsultation} from "../ServiceConsultation";
import {Accueil} from "../Accueil";


export class SignupRequestPersonnelMedical
{


   nom!:string;


   prenom!:string;



   username!:string;


   password!:string;


   email!:string;


   telephone!:string;


   photo!:string;

   roles!:Array<string>;

   titre!:string;

   fonction!:string;

   service!:string;

   accueil!:Accueil;

   salleAttente!:SalleAttente;

   serviceConsultation!:ServiceConsultation ;


}
