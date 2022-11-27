import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {SalleAttente} from "../../../common/SalleAttente";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {DossierMedicalService} from "../../../services/dossier-medical.service";
import {DossierMedicalRequest} from "../../../common/DossierMedicalRequest";
import {DossierMedical} from "../../../common/DossierMedical";
import {ConsultationService} from "../../../services/consultation.service";
import {Consultation} from "../../../common/Consultation";
import {Ordonnance} from "../../../common/Ordonnance";
import {OrdonnanceService} from "../../../services/ordonnance.service";
import {AuthService} from "../../../shared/auth/auth.service";
import {Utilisateur} from "../../../common/Utilisateur";
import {ConsultantService} from "../../../services/consultant.service";
import {Consultant} from "../../../common/Consultant";
import {PriseRdv} from "../../../common/PriseRdv";
import {PriseRdvService} from "../../../services/prise-rdv.service";

@Component({
  selector: 'app-dossier-medical-details',
  templateUrl: './dossier-medical-details.component.html',
  styleUrls: ['./dossier-medical-details.component.css','./dossier-medical-details.component.scss'],
  providers:[MessageService]
})
export class DossierMedicalDetailsComponent implements OnInit {
  //@Output() cons= new EventEmitter <number>();
  ordonnance !:Ordonnance;
  userInfo?: Utilisateur;
  ordshowhide:boolean=true;
  modif:boolean=true;
  rdv : PriseRdv = new PriseRdv();
  dossierMedical: DossierMedicalRequest = new DossierMedicalRequest();
  dossierMedical1: DossierMedical = new DossierMedical();
  consultations : Consultation[]=[];
  consultant:Consultant=new Consultant();
  ordonnances:Ordonnance[]=[];
  edit=this.fb.group({
    cons: [''],
    res: [''],
  });
  constructor(private route :Router,private auth: AuthService,private consultantService:ConsultantService,private activatedroute: ActivatedRoute, private fb: FormBuilder, private ordonnanceService: OrdonnanceService, private consultationService: ConsultationService, private dossierMedicalService: DossierMedicalService, private messageService: MessageService,private rdvService : PriseRdvService) {

    this.activatedroute.paramMap.subscribe((params) => {
      this.getRDV(params.get('idR'));
      this.getDossier(params.get('idD'));});
    this.userInfo=this.auth.loadUserFromLocalStorage();
   // this.getOrdonnances();
    this.getConsultant(this.userInfo?.id);
  }

  ngOnInit(): void {


    this.edit.controls.cons.setValue(this.dossierMedical1.consultationEffectuee);
    this.edit.controls.res.setValue(this.dossierMedical1.resultatPrestation);
    this.dossierMedical.consultationEffectuee=this.dossierMedical1.consultationEffectuee;
    this.dossierMedical.resultatPrestation=this.dossierMedical1.resultatPrestation;


  }

  getDossier(id: string | null) {
    this.dossierMedicalService.getDossierMedicalById(id).subscribe(
      (data) => {
        this.dossierMedical1 = data;
        this.getConsultationsByDossier(data.id);console.log(this.ordonnances);
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
getConsultationsByDossier(id: any) {
    this.consultationService.getConsultationsByDossier(id).subscribe(
      (data) => {
        this.consultations = data;this.getOrdonnances();

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
  getOrdonnances() {
    this.ordonnanceService.getOrdonnancesList().subscribe(
      (data) => {
        this.ordonnances = data;console.log(data);
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

  editDossier(dossier:DossierMedicalRequest){



dossier.id=this.dossierMedical1.id
    dossier.consultationEffectuee=this.dossierMedical1.consultationEffectuee;
    dossier.resultatPrestation=this.dossierMedical1.resultatPrestation;
    dossier.nomPatient=this.dossierMedical1.nomPatient;
    dossier.prenomPatient=this.dossierMedical1.prenomPatient;

    this.dossierMedicalService.editDossierMedical(dossier).subscribe(
      (data)=>{this.dossierMedical1= data;
      },
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
      },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Modifier avec succée'});}
    )
  }

  getConsultant(id:any){
    this.consultantService.getConsultantById(id).subscribe(
      (data)=>{this.consultant=data;
        if(this.dossierMedical1.serviceConsultation.id==data.serviceConsultation.id){
          this.modif=false;
        }},
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
        this.rdv=data;
      },
    (error)=>{

      this.rdv.payed=false;
      console.log("HEEEEEEEEEEEREEEEEEEEEE",this.rdv.payed);
    }
    )
  }

}
