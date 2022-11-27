import {ServiceConsultation} from "./ServiceConsultation";


export class Consultant
{

  id!:number;

   nom!:string;
   prenom!:string;
   username!:string;
   //  password!:string;
  email!:string;
  telephone!:string;
  photo!:string;
  roles!:Array<string>;
  calendrier!:string;
  fonction!:string;


  titre!:string;
  serviceConsultation!:ServiceConsultation ;
  LastUpdatedAt!:Date ;
  PostedAt!:Date ;

}
