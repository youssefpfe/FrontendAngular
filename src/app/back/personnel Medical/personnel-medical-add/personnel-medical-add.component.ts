import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {SignupRequestConsultant} from "../../../common/user/SignupRequestConsultant";
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {Role} from "../../../common/user/Role";
import {FormBuilder, Validators} from "@angular/forms";
import {SignupRequestPersonnelMedical} from "../../../common/user/SignupRequestPersonnelMedical";
import {ConsultantService} from "../../../services/consultant.service";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {PersonnelMedicalService} from "../../../services/personnel-medical.service";
import {Accueil} from "../../../common/Accueil";
import {SalleAttente} from "../../../common/SalleAttente";
import {AcceuilService} from "../../../services/acceuil.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personnel-medical-add',
  templateUrl: './personnel-medical-add.component.html',
  styleUrls: ['./personnel-medical-add.component.css'],
  providers:[MessageService]
})
export class PersonnelMedicalAddComponent implements OnInit {

  personnel: SignupRequestPersonnelMedical= new SignupRequestPersonnelMedical();
  serviceConsultations : ServiceConsultation[]=[];
  acceuils : Accueil[]=[];
  salleAttentes : SalleAttente[]=[];
  roles : string[]=Object.keys(Role).filter((item) => {
    return isNaN(Number(item));});

  add=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(4)]],
    nom: ['',[Validators.required,Validators.minLength(4)]],
    prenom: ['',[Validators.required,Validators.minLength(4)]],
    titre: ['',[Validators.required,Validators.minLength(4)]],
    fonction: ['',[Validators.required,Validators.minLength(4)]],
    service: ['',[Validators.required,Validators.minLength(4)]],
    password: ['',[Validators.required,Validators.minLength(8)]],
    telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]+')]],
    email: ['',[Validators.required,Validators.email]],

    photo: ['',[Validators.pattern('http[s]?://.*')]],

    serv: [''],
    acc: [''],
    salle: [''],
    rol: ['',[Validators.required]]

  })


  constructor(private route : Router,private location: Location,private fb: FormBuilder,private personnelService:PersonnelMedicalService,private serviceConsultationService : ServiceConsultationService,private salleAttenteService : SalleAttenteService,private messageService:MessageService, private acceuilService: AcceuilService) { }

  ngOnInit(): void {
    this.listServices();
this.listSalles();
this.listAcceuils();

  }


  addPersonnel(personnel:SignupRequestPersonnelMedical){

    let servi:ServiceConsultation= new ServiceConsultation();
    this.serviceConsultations.map((s)=>{if(s.id===Number(this.add.controls['serv'].value!)){servi.id=s.id}});
    let acc:Accueil=new Accueil();
    this.acceuils.map((s)=>{if(s.id===Number(this.add.controls['acc'].value!)){acc.id=s.id}});
    let salle:SalleAttente= new SalleAttente();
    this.salleAttentes.map((s)=>{if(s.id===Number(this.add.controls['salle'].value!)){salle.id=s.id}});
    let roles: string[]=[];
    roles.push(this.add.controls['rol'].value!)
    personnel.username=this.add.controls['username'].value!;
    personnel.nom=this.add.controls['nom'].value!;
    personnel.prenom=this.add.controls['prenom'].value!;
    personnel.photo=this.add.controls['photo'].value!;
    personnel.telephone=this.add.controls['telephone'].value!;
    personnel.email=this.add.controls['email'].value!;
    personnel.password=this.add.controls['password'].value!;
    personnel.titre=this.add.controls['titre'].value!;
    personnel.fonction=this.add.controls['fonction'].value!;
    personnel.service=this.add.controls['service'].value!;
    personnel.serviceConsultation= servi;

    personnel.accueil= acc;
    personnel.salleAttente= salle;
    personnel.roles=roles;

    this.personnelService.addPersonnel(personnel).subscribe(
      (data)=>{console.log(data)},
      (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Ajouter avec succée'});
        setTimeout(()=>{this.location.back()},1000);
      }
    )
  }

  listServices(){

    this.serviceConsultationService.getServicesList().subscribe(
      (data)=>{this.serviceConsultations=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{}
    )

  }

  listSalles(){

    this.salleAttenteService.getSallesList().subscribe(
      (data)=>{this.salleAttentes=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{}
    )

  }

  listAcceuils(){

    this.acceuilService.getAcceuilList().subscribe(
      (data)=>{this.acceuils=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
      },
      ()=>{}
    )

  }
}
