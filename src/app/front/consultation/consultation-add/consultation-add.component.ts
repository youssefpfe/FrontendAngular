import { Component, OnInit } from '@angular/core';
import {SalleAttente} from "../../../common/SalleAttente";
import {FormBuilder, Validators} from "@angular/forms";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {ConsultationRequest} from "../../../common/ConsultationRequest";
import {ConsultationService} from "../../../services/consultation.service";
import {DossierMedicalService} from "../../../services/dossier-medical.service";
import {DossierMedical} from "../../../common/DossierMedical";
import {ActivatedRoute, Router} from "@angular/router";
import {Utilisateur} from "../../../common/Utilisateur";
import {AuthService} from "../../../shared/auth/auth.service";
import {OrdonnanceRequest} from "../../../common/OrdonnanceRequest";
import {Examen} from "../../../common/Examen";
import {Medicament} from "../../../common/Medicament";
import {MedicamentService} from "../../../services/medicament.service";
import {ExamenService} from "../../../services/examen.service";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {Ordonnance} from "../../../common/Ordonnance";
import {OrdonnanceService} from "../../../services/ordonnance.service";
import {PriseRdvService} from "../../../services/prise-rdv.service";

@Component({
  selector: 'app-consultation-add',
  templateUrl: './consultation-add.component.html',
  styleUrls: ['./consultation-add.component.css'],
  providers:[MessageService]
})
export class ConsultationAddComponent implements OnInit {
addordonnance:boolean=false;
  hideaj:boolean=true;
  userInfo?: Utilisateur;
  consultation : ConsultationRequest=new ConsultationRequest();
  dossierMedical: DossierMedical = new DossierMedical();
  ordonnance:OrdonnanceRequest =new  OrdonnanceRequest();
   addord2:boolean=true;
examens:Examen[]=[];
medicaments: Medicament []=[];

  dropdownSettingsE:IDropdownSettings={};
  dropdownSettingsM:IDropdownSettings={};
  selectedExamens=[];
  selectedMedicaments=[];

  add=this.fb.group({
    date: ['',[Validators.required]],
    type: ['',[Validators.required]],
    diagnostic: ['',[Validators.required]],
  });
  addord=this.fb.group({
    nature: ['',[Validators.required]],
    myExamens: [this.selectedExamens],
    myMedicaments: [this.selectedMedicaments],

  });
  constructor(private priseService:PriseRdvService,private route : Router,private activatedroute: ActivatedRoute,private auth: AuthService,private fb: FormBuilder, private dossierMedicalService: DossierMedicalService,private consultationService : ConsultationService,private messageService:MessageService,private medicamentService : MedicamentService,private examenService : ExamenService,private ordonnanceService : OrdonnanceService) {
    this.listMedicaments();
    this.listExamens();

    this.activatedroute.paramMap.subscribe((params) => {
      this.getDossier(params.get('idD'));});
    this.userInfo=this.auth.loadUserFromLocalStorage();
  }

  ngOnInit(): void {



  this.dropdownSettingsE = {
    idField: 'id',
    textField: 'nomExamen',
    noDataAvailablePlaceholderText: "Pas d'examens disponible",
    allowSearchFilter: true,
    unSelectAllText:"true",
  };
  this.dropdownSettingsM = {
    idField: 'id',
    textField: 'nomMedicament',
    noDataAvailablePlaceholderText: "Pas d'examens disponible",
    allowSearchFilter: true,
    enableCheckAll: false,
  };

  }


  addConsultation(consultation:ConsultationRequest){




    consultation.dateConsultation=new Date(this.add.controls['date'].value!);
    consultation.typeConsultation=this.add.controls['type'].value!;
    consultation.diagnostic=this.add.controls['diagnostic'].value!;
    consultation.consultantId=Number(this.userInfo?.id);
    consultation.patientId=this.dossierMedical.patient.id;
    consultation.dossierMedicalId=this.dossierMedical.id;



    this.consultationService.addConsultation(consultation).subscribe(
      (data)=>{this.ordonnance.consultationId=data.id;this.addordonnance=true;
        this.activatedroute.paramMap.subscribe((params) => {
          this.priseService.delete((params.get('idR'))).subscribe(()=>{

          });

          });

        },
      (error)=>{this.messageService.add({severity:'failed', summary: 'Failed', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Ajouter avec succée'});}
    )
  }

  getDossier(id: string | null) {
    this.dossierMedicalService.getDossierMedicalById(id).subscribe(
      (data) => {
        this.dossierMedical = data;

      },
      (error) => {
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
      },
      () => {
      }
    )
  }


  listMedicaments(){

    this.medicamentService.getMedicamentList().subscribe(
      (data)=>{this.medicaments=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
      },
      ()=>{}
    )

  }

  listExamens(){

    this.examenService.getExamenList().subscribe(
      (data)=>{this.examens=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
      },
      ()=>{}
    )

  }

  addOrdonnance(ordonnance:OrdonnanceRequest){
  this.addord2=false;
    ordonnance.dateOrdonnance=new Date();
    ordonnance.nomPatient=this.dossierMedical.patient.nom +" "+ this.dossierMedical.patient.prenom;
    ordonnance.natureOrdonnance=this.addord.controls['nature'].value!;
    let exid:Array<number>=new Array<number>();

    let exarr:Array<Examen>=this.addord.controls['myExamens'].value!;
    for(let e of exarr){


      let ee:any;
      ee=e;
      exid.push(ee.id);

    }
    ordonnance.examensId=exid;

    let medid:Array<number>=new Array<number>();

    let medrr:Array<Medicament>=this.addord.controls['myMedicaments'].value!;
    for(let m of medrr){


      let mm:any;
      mm=m;
      medid.push(mm.id);

    }
    ordonnance.medicamentsId=medid;

    ordonnance.consultantId=this.dossierMedical.consultant.id;

    this.ordonnanceService.addOrdonnance(ordonnance).subscribe(
      (data)=>{},
      (error)=>{this.messageService.add({severity:'failed', summary: 'Failed', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Ajouter avec succée'});
        this.activatedroute.paramMap.subscribe((params) => {
          this.route.navigate(['../front/rdvs/' +params.get('id')+'/'+params.get('idR')+'/'+params.get('idD')]); });

      }
    )


  }


}
