import {ServiceConsultation} from "../ServiceConsultation";


export class SignupRequestConsultant
{


   nom!:string;


   prenom!:string;



   username!:string;


   password!:string;


   email!:string;


   telephone!:string;


   photo!:string;



   roles!:Array<string>;
  calendrier!:string;

  fonction!:string;


  titre!:string;


  serviceConsultation!:ServiceConsultation ;

}
