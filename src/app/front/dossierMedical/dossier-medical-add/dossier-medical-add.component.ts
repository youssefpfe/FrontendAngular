import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import {FormBuilder, Validators} from "@angular/forms";
import {PatientService} from "../../../services/patient.service";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";

import {Patient} from "../../../common/Patient";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/auth/auth.service";
import {Utilisateur} from "../../../common/Utilisateur";
import {ConsultantService} from "../../../services/consultant.service";
import {Consultant} from "../../../common/Consultant";
import {DossierMedicalRequest} from "../../../common/DossierMedicalRequest";
import {DossierMedicalService} from "../../../services/dossier-medical.service";

@Component({
  selector: 'app-dossier-medical-add',
  templateUrl: './dossier-medical-add.component.html',
  styleUrls: ['./dossier-medical-add.component.css'],
  providers:[MessageService]
})
export class DossierMedicalAddComponent implements OnInit {

  userInfo?: Utilisateur;
  patient: Patient= new Patient();
  consultant: Consultant= new Consultant();
dossierMedical:DossierMedicalRequest=new  DossierMedicalRequest();


  add=this.fb.group({
    conseff: [''],
    resultat: [''],

  })


  constructor(private location: Location,private activatedroute: ActivatedRoute,private route : Router,private fb: FormBuilder,private patientService:PatientService,private serviceConsultationService : ServiceConsultationService,private salleAttenteService : SalleAttenteService,private messageService:MessageService,private auth: AuthService,private consultantService:ConsultantService,private  dossierMedicalService : DossierMedicalService) {
    this.userInfo=this.auth.loadUserFromLocalStorage(); }

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe((params) => {
      this.getPatient(params.get('id'));})
    this.getConsultant(this.userInfo?.id);


  }


  addDossier(dossier:DossierMedicalRequest){


    dossier.nomPatient=this.patient.nom;
    dossier.prenomPatient=this.patient.prenom;
    dossier.consultationEffectuee=this.add.controls['conseff'].value!;
    dossier.resultatPrestation=this.add.controls['resultat'].value!;
    dossier.consultantId=this.consultant.id;
    dossier.serviceconsultationId=this.consultant.serviceConsultation.id;
    dossier.patientId=this.patient.id;




    this.dossierMedicalService.addDossierMedical(dossier).subscribe(
      (data)=>{console.log(data);},
      (error)=>{this.messageService.add({severity:'error', summary: 'Error!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'ajout avec succée'});
      setTimeout(()=>{this.location.back()},1000);

      }
    )
  }

  getPatient(id: any) {
    this.patientService.getPatientById(id).subscribe(
      (data) => {
        this.patient = data
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
  getConsultant(id:any){
    this.consultantService.getConsultantById(id).subscribe(
      (data)=>{this.consultant=data;},
      ()=>{},
      ()=>{}
    )
  }
}
