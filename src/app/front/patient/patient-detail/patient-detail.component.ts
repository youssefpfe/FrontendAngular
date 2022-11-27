import { Component, OnInit } from '@angular/core';
import {PatientRequest} from "../../../common/PatientRequest";
import {DetailsPatientRequest} from "../../../common/DetailsPatientRequest";
import {Patient} from "../../../common/Patient";
import {DetailsPatient} from "../../../common/DetailsPatient";
import {PatientService} from "../../../services/patient.service";
import {DetailPatientService} from "../../../services/detail-patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DossierMedicalService} from "../../../services/dossier-medical.service";
import {DossierMedical} from "../../../common/DossierMedical";
import {Utilisateur} from "../../../common/Utilisateur";
import {AuthService} from "../../../shared/auth/auth.service";
import {ConsultantService} from "../../../services/consultant.service";
import {Consultant} from "../../../common/Consultant";
import {PriseRdvService} from "../../../services/prise-rdv.service";
import {PriseRdv} from "../../../common/PriseRdv";

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient = new Patient();
  detailPatient: DetailsPatient = new DetailsPatient();
  dossierMedicals: DossierMedical[] = [];
  consultant: Consultant= new Consultant();
  rdv : PriseRdv = new PriseRdv();
  ajout: boolean=true;
  userInfo?: Utilisateur;
  constructor(private route:Router,private auth: AuthService,private patientService:PatientService,private detailspatientService: DetailPatientService,private activatedroute: ActivatedRoute,private dossierMedicalService :DossierMedicalService,private consultantService:ConsultantService,private rdvService : PriseRdvService) {
    this.userInfo=this.auth.loadUserFromLocalStorage();
    this.getConsultant(this.userInfo?.id);
    this.activatedroute.paramMap.subscribe((params) => {


      this.getRDV(params.get('idR'));
      this.getPatient(params.get('id'));
      this.getPatientDossierMedicals(params.get('id'));
    })
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {


      this.getRDV(params.get('idR'));
      this.getPatient(params.get('id'));
      this.getPatientDossierMedicals(params.get('id'));
    });


  }


  getPatient(id: string | null) {
    this.patientService.getPatientById(id).subscribe(
      (data) => {
        this.patient=data;
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

  getPatientDossierMedicals(id: any) {
    this.dossierMedicalService.getPatientDossierMedicalList(id).subscribe(
      (data) => {
        this.dossierMedicals=data;
        this.getConsultant(this.userInfo?.id);
        for(let d of data){
          if(this.consultant.serviceConsultation?.id==undefined){this.ajout=false}
          if(d.serviceConsultation.id==this.consultant.serviceConsultation?.id){

            this.ajout=false;

          }
        }
        console.log(this.ajout);
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
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
      },
      ()=>{}
    )
  }

  getRDV(id:any){
    this.rdvService.getPriseRdvById(id).subscribe(
      (data)=>{
            this.rdv=data;console.log(data);
      }
    )
  }

}
