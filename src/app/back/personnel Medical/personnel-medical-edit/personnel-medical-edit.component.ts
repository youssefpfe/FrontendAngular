import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {Accueil} from "../../../common/Accueil";
import {SalleAttente} from "../../../common/SalleAttente";
import {Role} from "../../../common/user/Role";
import {FormBuilder, Validators} from "@angular/forms";
import {PersonnelMedicalService} from "../../../services/personnel-medical.service";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {AcceuilService} from "../../../services/acceuil.service";
import {PersonnelMedical} from "../../../common/PersonnelMedical";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-personnel-medical-edit',
  templateUrl: './personnel-medical-edit.component.html',
  styleUrls: ['./personnel-medical-edit.component.css'],
  providers: [MessageService]
})
export class PersonnelMedicalEditComponent implements OnInit {

  personnel: PersonnelMedical= new PersonnelMedical();
  serviceConsultations : ServiceConsultation[]=[];
  acceuils : Accueil[]=[];
  salleAttentes : SalleAttente[]=[];
  idsall!:number;
  idserv!:number;
  idac!:number;
  roles : string[]=Object.keys(Role).filter((item) => {
    return isNaN(Number(item));});

  edit=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(4)]],
    nom: ['',[Validators.required,Validators.minLength(4)]],
    prenom: ['',[Validators.required,Validators.minLength(4)]],
    titre: ['',[Validators.required,Validators.minLength(4)]],
    fonction: ['',[Validators.required,Validators.minLength(4)]],
    service: ['',[Validators.required,Validators.minLength(4)]],
    telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]+')]],
    email: ['',[Validators.required,Validators.email]],

    photo: ['',[Validators.pattern('http[s]?://.*')]],

    serv: [''],
    acc: [''],
    salle: [''],
    rol: ['',[Validators.required]]

  })



  constructor(private route : Router,private location: Location,private activatedroute: ActivatedRoute,private fb: FormBuilder,private personnelService:PersonnelMedicalService,private serviceConsultationService : ServiceConsultationService,private salleAttenteService : SalleAttenteService,private messageService:MessageService, private acceuilService: AcceuilService) { }

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe((params) => {
      this.getPersonnel(params.get('id'));})
this.listAcceuils();
    this.listSalles();
    this.listServices();

    this.edit.controls.username.setValue(this.personnel.username);
    this.edit.controls.nom.setValue(this.personnel.nom);
    this.edit.controls.prenom.setValue(this.personnel.prenom);
    this.edit.controls.email.setValue(this.personnel.email);
    this.edit.controls.telephone.setValue(this.personnel.telephone);
    this.edit.controls.photo.setValue(this.personnel.photo);
    this.edit.controls.titre.setValue(this.personnel.titre);
    this.edit.controls.fonction.setValue(this.personnel.fonction);
    this.edit.controls.service.setValue(this.personnel.service);
    this.edit.controls.serv.setValue(this.personnel.serviceConsultation.toString());
    this.edit.controls.acc.setValue(this.personnel.accueil.id.toString());
    this.edit.controls.salle.setValue(this.personnel.salleAttente.id.toString());
    this.edit.controls.rol.setValue(this.personnel.roles[0]);
    console.log("dfgsdfgsdf"+this.personnel.accueil.id)
    console.log(this.personnel.serviceConsultation.id)
  }


  editPersonnel(personnel:PersonnelMedical){

    let servi:ServiceConsultation= new ServiceConsultation();
    this.serviceConsultations.map((s)=>{if(s.id===Number(this.edit.controls['serv'].value!)){servi.id=s.id}});
    let acc:Accueil=new Accueil();
    this.acceuils.map((s)=>{if(s.id===Number(this.edit.controls['acc'].value!)){acc.id=s.id}});
    let salle:SalleAttente= new SalleAttente();
    this.salleAttentes.map((s)=>{if(s.id===Number(this.edit.controls['salle'].value!)){salle.id=s.id}});
    let roles: string[]=[];
    roles.push(this.edit.controls['rol'].value!)
    personnel.username=this.edit.controls['username'].value!;
    personnel.nom=this.edit.controls['nom'].value!;
    personnel.prenom=this.edit.controls['prenom'].value!;
    personnel.photo=this.edit.controls['photo'].value!;
    personnel.telephone=this.edit.controls['telephone'].value!;
    personnel.email=this.edit.controls['email'].value!;
    personnel.titre=this.edit.controls['titre'].value!;
    personnel.fonction=this.edit.controls['fonction'].value!;
    personnel.service=this.edit.controls['service'].value!;

    personnel.serviceConsultation= servi;

    personnel.accueil= acc;
    personnel.salleAttente= salle;
    personnel.roles=roles;

    this.personnelService.editPersonnel(personnel).subscribe(
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

  getPersonnel(id:string|null){
    this.personnelService.getPersonnelById(id).subscribe(
      (data)=>{console.log(data)
        if(data.serviceConsultation===null){
        this.idserv=-1;

      }else{this.idserv=data.serviceConsultation.id;}
  if(data.salleAttente===null){
        this.idsall=-1;

      }else{this.idsall=data.salleAttente.id;}
  if(data.accueil===null){
        this.idac=-1;

      }else{this.idac=data.accueil.id}



        this.personnel=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{}
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
          };},1000)
      },
      ()=>{}
    )

  }


  preSelection(variab:any){
   console.log(this.personnel.serviceConsultation.id.toString());
    return variab.toString() === this.personnel.serviceConsultation.id.toString();
  }
}
