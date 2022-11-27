import { Component, OnInit } from '@angular/core';
import {Consultant} from "../../common/Consultant";
import {FormBuilder, Validators} from "@angular/forms";
import {ConsultantService} from "../../services/consultant.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MessageService } from 'primeng/api';
import {ServiceConsultationService} from "../../services/service-consultation.service";
import {ServiceConsultation} from "../../common/ServiceConsultation";
import {Location} from "@angular/common";

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.css'],
  providers: [MessageService]
})
export class ConsultantEditComponent implements OnInit {
  idserv!:number;
  consultant: Consultant= new Consultant();
  serviceConsultations : ServiceConsultation[]=[];
  editconsultant=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(3)]],
    nom: ['',[Validators.required,Validators.minLength(3)]],
    prenom: ['',[Validators.required,Validators.minLength(3)]],
    telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(12),Validators.pattern('[0-9]+')]],
    email: ['',[Validators.required,Validators.email]],
    fonction: ['',[Validators.required,Validators.minLength(3)]],
    titre: ['',[Validators.required,Validators.minLength(3)]],

    photo: ['',[Validators.pattern('http[s]?://.*')]],
    serv: ['',[Validators.required]]

  })

  constructor(private route : Router,private location: Location,private fb: FormBuilder,private consultantService:ConsultantService,private serviceConsultationService : ServiceConsultationService,private activatedroute: ActivatedRoute,private messageService:MessageService) {

  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.getConsultant(params.get('id'));})

    this.listServices();

    this.editconsultant.controls.username.setValue(this.consultant.username);
    this.editconsultant.controls.nom.setValue(this.consultant.nom);
    this.editconsultant.controls.prenom.setValue(this.consultant.prenom);
    this.editconsultant.controls.email.setValue(this.consultant.email);
    this.editconsultant.controls.telephone.setValue(this.consultant.telephone);
    this.editconsultant.controls.photo.setValue(this.consultant.photo);
    this.editconsultant.controls.titre.setValue(this.consultant.titre);
    this.editconsultant.controls.fonction.setValue(this.consultant.fonction);
    setTimeout(()=>{
      console.log("HEEEEEEEERRRRREEEEEEE",this.consultant);
    },2000);


    this.editconsultant.controls.serv.setValue(this.consultant.serviceConsultation.toString());



  }

editConsultant(consultant:Consultant){

  let servi!:ServiceConsultation;
  this.serviceConsultations.map((s)=>{if(s.id===Number(this.editconsultant.controls['serv'].value!)){servi=s}});


  consultant.username=this.editconsultant.controls['username'].value!;
  consultant.nom=this.editconsultant.controls['nom'].value!;
  consultant.prenom=this.editconsultant.controls['prenom'].value!;
  consultant.photo=this.editconsultant.controls['photo'].value!;
  consultant.telephone=this.editconsultant.controls['telephone'].value!;
  consultant.email=this.editconsultant.controls['email'].value!;
  consultant.fonction=this.editconsultant.controls['fonction'].value!;
  consultant.titre=this.editconsultant.controls['titre'].value!;
  consultant.serviceConsultation= servi;

  this.consultantService.editConsultant(consultant).subscribe(
    (data)=>{this.consultant=data;},
    (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});},
    ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Modifier avec succée'});
      setTimeout(()=>{this.location.back()},1000);}
  )
}

getConsultant(id:string|null){
  this.consultantService.getConsultantById(id).subscribe(
    (data)=>{this.consultant=data;
      if(data.serviceConsultation===null){
        this.idserv=-1;

      }else{this.idserv=data.serviceConsultation.id;}
      },
    ()=>{},
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

  private get username(){
    return this.editconsultant.get('username');
  }

  get nom(){
    return this.editconsultant.get('nom');
  }
  get photo(){
    return this.editconsultant.get('photo');
  }
  get prenom(){
    return this.editconsultant.get('prenom');
  }
  get email(){
    return this.editconsultant.get('email');
  }
  get telephone(){
    return this.editconsultant.get('telephone');
  }


}
