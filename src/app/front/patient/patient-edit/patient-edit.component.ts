import { Component, OnInit } from '@angular/core';
import {ServiceConsultationRequest} from "../../../common/ServiceConsultationRequest";
import {SalleAttente} from "../../../common/SalleAttente";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {PatientRequest} from "../../../common/PatientRequest";
import {PatientService} from "../../../services/patient.service";
import {DetailsPatient} from "../../../common/DetailsPatient";
import {DetailPatientService} from "../../../services/detail-patient.service";
import {DetailsPatientRequest} from "../../../common/DetailsPatientRequest";
import {toString} from "@ng-bootstrap/ng-bootstrap/util/util";
import {Location} from "@angular/common";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
  providers:[MessageService]
})
export class PatientEditComponent implements OnInit {


  patient: PatientRequest = new PatientRequest();
  detailPatient: DetailsPatientRequest = new DetailsPatientRequest();
det:boolean=false;

  edit = this.fb.group({
    genre: ['',[Validators.required,Validators.minLength(4)]],
    nom: ['',[Validators.required,Validators.minLength(3)]],
    prenom: ['',[Validators.required,Validators.minLength(3)]],
    dateNaissance: ['',[Validators.required]],
    tauxAssurance: [''],
    numIdendite: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
    email: ['',[Validators.email]],
    assure: ['',[Validators.required]],
    domicile: ['',[Validators.required]],
    assurance: [''],
    photo: ['',[Validators.pattern('http[s]?://.*')]],
    salle: [''],
    numAffeliation: [''],
  });
 add = this.fb.group({
   status: ['',[Validators.required,Validators.minLength(4)]],
   serviceAffectation: ['',[Validators.required,Validators.minLength(3)]],
   etatDuPatient: ['',[Validators.required,Validators.minLength(4)]],
   heurePriseCharge: ['',[Validators.required]],

  });


  constructor(private route:Router,private location: Location,private activatedroute: ActivatedRoute, private fb: FormBuilder, private serviceConsultationService: ServiceConsultationService, private detailspatientService: DetailPatientService, private salleAttenteService: SalleAttenteService,private patientService:PatientService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.getPatient(params.get('id'));})
    //this.listSalles();

    this.edit.controls.nom.setValue(this.patient.nom);
   // this.edit.controls.salle.setValue(this.patient!.salleAttenteId.toString());
    this.edit.controls.genre.setValue(this.patient.genre);
    this.edit.controls.assure.setValue(this.patient?.estAssure.toString());
    this.edit.controls.email.setValue(this.patient.email);
    this.edit.controls.tauxAssurance.setValue(this.patient.tauxAssurance.toString());
    this.edit.controls.photo.setValue(this.patient.photo);
    this.edit.controls.dateNaissance.setValue(this.patient.dateNaissance.toString());
    this.edit.controls.numIdendite.setValue(this.patient.numIdendite.toString());
    this.edit.controls.domicile.setValue(this.patient.domicile);
    this.edit.controls.numAffeliation.setValue(this.patient.numAffeliation);

  }

  getPatient(id: string | null) {
    this.patientService.getPatientById(id).subscribe(
      (data) => {
        this.patient.id = data.id;
        this.patient.detailPatientId = data?.detailsPatient?.id;
        this.patient.email = data.email;
        this.patient.prenom = data.prenom;
        this.patient.nom = data.nom;
        this.patient.assurance = data.assurance;
        this.patient.dateNaissance = data.dateNaissance;
        this.patient.domicile = data.domicile;
        this.patient.estAssure = data.estAssure;
        this.patient.genre = data.genre;
        this.patient.numIdendite = data.numIdendite;

        this.patient.priseRDVs = data.priseRDVs;
        this.patient.salleAttenteId = data?.salleAttente?.id;
        this.patient.photo = data.photo;
        this.patient.numAffeliation = data.numAffeliation;

        this.patient.tauxAssurance = data.tauxAssurance;
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

 /* listSalles(){

    this.salleAttenteService.getSallesList().subscribe(
      (data)=>{this.salleAttentes=data;},
      ()=>{},
      ()=>{}
    )

  }*/


  editPatient(patient:PatientRequest){


    patient.id = this.patient.id;
    //patient.detailPatientId = this.edit.controls['nom'].value!;
    patient.email = this.edit.controls['email'].value!;
      patient.prenom =this.edit.controls['prenom'].value!;
      patient.nom =this.edit.controls['nom'].value!;
    patient.assurance =this.edit.controls['assurance'].value!;
    patient.dateNaissance =new Date(this.edit.controls['dateNaissance'].value!);
    patient.domicile =this.edit.controls['domicile'].value!;
    patient.estAssure =Boolean(this.edit.controls['assure'].value!);
    patient.genre =this.edit.controls['genre'].value!;
    patient.photo =this.edit.controls['photo'].value!;
      patient.numIdendite =Number(this.edit.controls['numIdendite'].value!);
    patient.tauxAssurance =Number(this.edit.controls['tauxAssurance'].value!);
    patient.numAffeliation =this.edit.controls['numAffeliation'].value!;
    if(!Boolean(this.edit.controls['assure'].value!)){
      patient.tauxAssurance =Number('');
      patient.numAffeliation='0';
    }

    patient.salleAttenteId =Number(this.edit.controls['salle'].value!);


    this.patientService.editPatient(patient).subscribe(
      (data)=>{
        this.patient.id = data.id;
        this.patient.detailPatientId = data?.detailsPatient?.id;
        this.patient.email = data.email;
        this.patient.prenom = data.prenom;
        this.patient.nom = data.nom;
        this.patient.assurance = data.assurance;
        this.patient.dateNaissance = data.dateNaissance;
        this.patient.domicile = data.domicile;
        this.patient.estAssure = data.estAssure;
        this.patient.genre = data.genre;
        this.patient.numIdendite = data.numIdendite;
        this.patient.tauxAssurance = data.tauxAssurance;
        this.patient.numAffeliation = data.numAffeliation;
        this.patient.priseRDVs = data.priseRDVs;
        this.patient.salleAttenteId = data?.salleAttente?.id;
      },
      (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);},
      ()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Modifier avec succée'});
      this.location.back();
      }
    )
  }
  addDetailPatient(detail:DetailsPatientRequest){


    detail.etatDuPatient=this.add.controls['etatDuPatient'].value!;
    detail.heurePriseCharge=new Date(this.add.controls['heurePriseCharge'].value!);
    detail.status=this.add.controls['status'].value!;
    detail.patientId=this.patient.id;
    detail.serviceAffectation=this.add.controls['serviceAffectation'].value!;





    this.detailspatientService.addPatient(detail).subscribe(
      (data)=>{console.log(data);},
      (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'ajout avec succée'});}
    );
    this.det=false;
  }


}
