import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ConsultantService} from "../../services/consultant.service";
import {Consultant} from "../../common/Consultant";
import {SignupRequestConsultant} from "../../common/user/SignupRequestConsultant";
import {MessageService} from "primeng/api";
import {ServiceConsultation} from "../../common/ServiceConsultation";
import {ServiceConsultationService} from "../../services/service-consultation.service";
import {InputNumber} from "primeng/inputnumber";
import {Role} from "../../common/user/Role";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-consultant-add',
  templateUrl: './consultant-add.component.html',
  styleUrls: ['./consultant-add.component.css'],
  providers: [MessageService]
})
export class ConsultantAddComponent implements OnInit {


  consultant: SignupRequestConsultant= new SignupRequestConsultant();
  serviceConsultations : ServiceConsultation[]=[];
  roles : string[]=Object.keys(Role).filter((item) => {
    return isNaN(Number(item));});

  addconsultant=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
    nom: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    prenom: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(50)]],
    telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(12),Validators.pattern('[0-9]+')]],
    fonction: ['',[Validators.required,Validators.minLength(3)]],
    titre: ['',[Validators.required,Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.email]],

    photo: ['',[Validators.pattern('http[s]?://.*')]],

    serv: ['',[Validators.required]],
    rol: ['',[Validators.required]]

  })


  constructor(private route : Router,private location: Location,private fb: FormBuilder,private consultantService:ConsultantService,private serviceConsultationService : ServiceConsultationService,private messageService:MessageService) { }

  ngOnInit(): void {

this.listServices();

  }

  addConsultant(consultant:SignupRequestConsultant){

    let servi!:ServiceConsultation;
    this.serviceConsultations.map((s)=>{if(s.id===Number(this.addconsultant.controls['serv'].value!)){servi=s}});
    let roles: string[]=[];
roles.push(this.addconsultant.controls['rol'].value!)
    consultant.username=this.addconsultant.controls['username'].value!;
    consultant.nom=this.addconsultant.controls['nom'].value!;
    consultant.prenom=this.addconsultant.controls['prenom'].value!;
    consultant.photo=this.addconsultant.controls['photo'].value!;
    consultant.telephone=this.addconsultant.controls['telephone'].value!;
    consultant.fonction=this.addconsultant.controls['fonction'].value!;
    consultant.titre=this.addconsultant.controls['titre'].value!;
    consultant.email=this.addconsultant.controls['email'].value!;
    consultant.password=this.addconsultant.controls['password'].value!;
    consultant.serviceConsultation= servi;
    consultant.roles=roles;

    this.consultantService.addConsultant(consultant).subscribe(
      (data)=>{console.log(data)},
      (error)=>{this.messageService.add({severity:'error', summary: 'Error', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)},
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Ajouter avec succée'});
        setTimeout(()=>{this.location.back()},1000);}
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

  get nom(){
    return this.addconsultant.get('nom');
  }
  get photo(){
    return this.addconsultant.get('photo');
  }
  get prenom(){
    return this.addconsultant.get('prenom');
  }
  get email(){
    return this.addconsultant.get('email');
  }
  get telephone(){
    return this.addconsultant.get('telephone');
  }

}
