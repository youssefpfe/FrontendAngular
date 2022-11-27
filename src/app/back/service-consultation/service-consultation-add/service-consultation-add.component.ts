import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ConsultantService} from "../../../services/consultant.service";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {MessageService} from "primeng/api";
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {SignupRequestConsultant} from "../../../common/user/SignupRequestConsultant";
import {SalleAttente} from "../../../common/SalleAttente";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {ServiceConsultationRequest} from "../../../common/ServiceConsultationRequest";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-service-consultation-add',
  templateUrl: './service-consultation-add.component.html',
  styleUrls: ['./service-consultation-add.component.css'],
  providers:[MessageService]
})
export class ServiceConsultationAddComponent implements OnInit {



  serviceConsultation : ServiceConsultationRequest= new ServiceConsultationRequest();
  salleAttentes : SalleAttente[]=[];
  add=this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(4)]],
    type: ['',[Validators.required,Validators.minLength(4)]],
    salle: ['',[Validators.required]],
  });
  constructor(private route : Router,private location: Location,private fb: FormBuilder,private serviceConsultationService : ServiceConsultationService,private salleAttenteService : SalleAttenteService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.listSalles();
  }

  addService(service:ServiceConsultationRequest){




    service.typeService=this.add.controls['type'].value!;
    service.nomService=this.add.controls['nom'].value!;
    service.salleAttenteId= Number(this.add.controls['salle'].value!);



    this.serviceConsultationService.addService(service).subscribe(
      (data)=>{console.log(data)},
      (error)=>{this.messageService.add({severity:'error', summary: 'Failed', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Ajouter avec succée'});
        setTimeout(()=>{this.location.back()},1000);}
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
}
