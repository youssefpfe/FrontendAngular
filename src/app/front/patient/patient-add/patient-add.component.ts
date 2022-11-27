import { Component, OnInit } from '@angular/core';
import {SignupRequestPersonnelMedical} from "../../../common/user/SignupRequestPersonnelMedical";
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {Accueil} from "../../../common/Accueil";
import {SalleAttente} from "../../../common/SalleAttente";
import {Role} from "../../../common/user/Role";
import {FormBuilder, Validators} from "@angular/forms";
import {PersonnelMedicalService} from "../../../services/personnel-medical.service";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {AcceuilService} from "../../../services/acceuil.service";
import {PatientRequest} from "../../../common/PatientRequest";
import {PatientService} from "../../../services/patient.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css'],
  providers:[MessageService]
})
export class PatientAddComponent implements OnInit {

  patient: PatientRequest= new PatientRequest();



  add=this.fb.group({
    genre: ['',[Validators.required,Validators.minLength(4)]],
    nom: ['',[Validators.required,Validators.minLength(3)]],
    prenom: ['',[Validators.required,Validators.minLength(3)]],
    dateNaissance: ['',[Validators.required]],
    tauxAssurance: [''],
    numAffeliation: [''],
    domicile: ['',[Validators.required]],
    numIdendite: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
    //telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]+')]],
    email: ['',[Validators.email]],
    assure: ['',[Validators.required]],
    photo: ['',[Validators.pattern('http[s]?://.*')]],



  })


  constructor(private route:Router,private location: Location,private fb: FormBuilder,private patientService:PatientService,private serviceConsultationService : ServiceConsultationService,private salleAttenteService : SalleAttenteService,private messageService:MessageService, private acceuilService: AcceuilService) { }

  ngOnInit(): void {


  }


  addPatient(patient:PatientRequest){


    patient.genre=this.add.controls['genre'].value!;
    patient.nom=this.add.controls['nom'].value!;
    patient.prenom=this.add.controls['prenom'].value!;
    patient.photo=this.add.controls['photo'].value!;
    patient.dateNaissance=new Date (this.add.controls['dateNaissance'].value!);
    patient.email=this.add.controls['email'].value!;
    patient.numAffeliation=this.add.controls['numAffeliation'].value!;
    patient.numIdendite=Number(this.add.controls['numIdendite'].value!);
patient.domicile=this.add.controls['domicile'].value!;
    patient.tauxAssurance=Number(this.add.controls['tauxAssurance'].value!);



    this.patientService.addPatient(patient).subscribe(
      (data)=>{},
      (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'ajout avec succée'});
      this.location.back();
      }
    )
  }

 /* reqtn(){
    this.add.get('assure')!.valueChanges
      .subscribe(value => {
        console.log("xxxxx"+value);
          if(value) {
            this.add.get('tauxAssurance')!.setValidators(Validators.required)
            this.add.get('numAffeliation')!.setValidators(Validators.required)
          } else {
            this.add.get('tauxAssurance')!.clearValidators();
            this.add.get('numAffeliation')!.clearValidators();
          }
        }
      );

  }*/

}
