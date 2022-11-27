import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../shared/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Utilisateur} from "../../../common/Utilisateur";
import {PriseRdv} from "../../../common/PriseRdv";
import {PriseRdvService} from "../../../services/prise-rdv.service";
import {FacturationService} from "../../../services/facturation.service";
import {FacturationRequest} from "../../../common/FacturationRequest";
import {PriseRdvRequest} from "../../../common/PriseRdvRequest";
import {Facturation} from "../../../common/Facturation";
import {AssuranceService} from "../../../services/assurance.service";
import {Assurance} from "../../../common/Assurance";
import {PatientService} from "../../../services/patient.service";
import {DetailPatientService} from "../../../services/detail-patient.service";
import {Patient} from "../../../common/Patient";
import {DetailsPatient} from "../../../common/DetailsPatient";

@Component({
  selector: 'app-facture-add',
  templateUrl: './facture-add.component.html',
  styleUrls: ['./facture-add.component.css'],
  providers:[MessageService]
})
export class FactureAddComponent implements OnInit {
  userInfo?: Utilisateur;
priseRdv:PriseRdv=new PriseRdv();
patient:Patient=new Patient();
detailsPatient:DetailsPatient=new DetailsPatient();
aRendre:number=0;
recue!:number;
added:boolean=false;
imprim:boolean=true;
aRendreString:string='';
facture:FacturationRequest=new FacturationRequest();
factureprint:Facturation=new Facturation();
date:Date=new Date();

  add=this.fb.group({
    type: ['espece',[Validators.required]],
    sommeRecue: ['',[Validators.required]]
  });


  constructor(private route:Router,private activatedroute: ActivatedRoute,private auth: AuthService,private fb: FormBuilder,private messageService:MessageService,private priseService :PriseRdvService,private factureService: FacturationService,private assuranceService: AssuranceService,private patientService: PatientService,private detailPatientService: DetailPatientService) {
    this.activatedroute.paramMap.subscribe((params) => {

      this.getPriseRdv(params.get('idrdv'));
      this.getPatient(params.get('id'));

    });
    this.userInfo=this.auth.loadUserFromLocalStorage();
  }

  ngOnInit(): void {

  }

  getPriseRdv(id:any){
    this.priseService.getPriseRdvById(id).subscribe(
      (data)=>{
        this.priseRdv=data;
        if(data.facturation!=null){
          this.factureprint=data.facturation;
        }
      }
    )
  }
  makeRandom() {
    let text = "";
    let possible = "MNOPQRSTUVWXYZ1234567890abcdefghijklmn";
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getFactureById(id:any){
    this.factureService.getFacturationById(id).subscribe(
      (data)=>{
        this.factureprint=data;
      },
      (error)=>{setTimeout(()=>{
        if(error.status==401){
          this.route.navigate(['login']);
        };},1000);}
    )

  }


addFacture(facture:FacturationRequest){
    let prise:PriseRdvRequest=new  PriseRdvRequest();
facture.dateFacture=this.date;
facture.codeFacture=this.makeRandom();
facture.examenId=this.priseRdv.examen.id;
facture.sommeRecue=this.recue;
facture.montantAPayer=this.priseRdv.examen.prixExamen*(1-this.priseRdv.patient.tauxAssurance);
facture.sommeRendue=this.aRendre;
facture.priseRDVId=this.priseRdv.id;
facture.typePaiement=this.add.controls['type'].value!;
facture.nomAgent=this.userInfo?.nom + " " +this.userInfo?.nom;
prise.id=this.priseRdv.id;
prise.payed=true;


this.priseService.editPriseRdv(prise).subscribe(
  (data)=>{this.priseRdv=data;
    this.factureService.addFacturation(facture).subscribe(
      (data2)=>{
        this.factureprint=data2;
        let assurance:Assurance=new Assurance();
            assurance.codeFacture=facture.codeFacture;
            assurance.datePrestation=facture.dateFacture;
            assurance.identitePatient=this.priseRdv.patient.numIdendite;
            assurance.datePrestation=this.priseRdv.dateRDV;
            assurance.montantConvention=this.priseRdv.examen.prixExamen - facture.sommeRecue;
            assurance.prenomPatient=this.priseRdv.patient.prenom;
            assurance.nomPatient=this.priseRdv.patient.nom;
            assurance.typePrestation=this.priseRdv.examen.nomExamen;
            assurance.numAffeliation=this.priseRdv.patient.numAffeliation;
            console.log(this.priseRdv.patient.estAssure);
            if(this.priseRdv.patient.estAssure==true) {
              this.assuranceService.addAssurance(assurance).subscribe(
                (assu) => {
                  console.log(assu);
                  this.messageService.add({severity: 'success', summary: 'Succée!', detail: "Facture Ajouter"});
                }
              );
            }

      },
    (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
      setTimeout(()=>{
        if(error.status==401){
          this.route.navigate(['login']);
        };},1000);
      }
    )
  }
)

}
  print() {
    this.imprim=false;

    setTimeout(()=>{
    window.print();
      this.imprim=true;
    },50);
  }
aRendrefct(){

  this.aRendre=Number(this.recue)-(this.priseRdv.examen.prixExamen*(1-this.priseRdv.patient.tauxAssurance))
  this.aRendreString=this.aRendre.toString();
  if(this.aRendre.toString().match(',')){
    this.aRendreString=this.aRendre.toString().replace(",","");
  }
}

cheque(){
    if("chèque"==this.add.controls['type'].value!){
      this.aRendre=0;
      this.recue=this.priseRdv.examen.prixExamen*(1-this.priseRdv.patient.tauxAssurance);
      this.recue=Number(this.recue.toPrecision(3));
      this.aRendre.toPrecision(3);
      $("#rec").attr('disabled', 'disabled');
    }else{
      this.aRendre=0;
      $("#rec").removeAttr('disabled');
    }
}
    getPatient(id:any) {
      this.patientService.getPatientById(id).subscribe(
        ()=>{

        }
      )

    }


}
