import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {ServiceConsultationRequest} from "../../../common/ServiceConsultationRequest";
import {SalleAttente} from "../../../common/SalleAttente";
import {Consultant} from "../../../common/Consultant";
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {Location} from "@angular/common";

@Component({
  selector: 'app-service-consultation-edit',
  templateUrl: './service-consultation-edit.component.html',
  styleUrls: ['./service-consultation-edit.component.css'],
  providers:[MessageService]
})
export class ServiceConsultationEditComponent implements OnInit {

  serviceConsultation: ServiceConsultationRequest = new ServiceConsultationRequest();
  salleAttentes: SalleAttente[] = [];

  edit = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(4)]],
    type: ['', [Validators.required, Validators.minLength(4)]],
    salle: ['', [Validators.required]],
  });


  constructor(private route : Router,private location: Location,private activatedroute: ActivatedRoute, private fb: FormBuilder, private serviceConsultationService: ServiceConsultationService, private salleAttenteService: SalleAttenteService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.getService(params.get('id'));})
this.listSalles();

    this.edit.controls.nom.setValue(this.serviceConsultation.nomService);
    this.edit.controls.type.setValue(this.serviceConsultation.typeService);
    this.edit.controls.salle.setValue(this.serviceConsultation.salleAttenteId.toString());


  }

  getService(id: string | null) {
    this.serviceConsultationService.getServiceById(id).subscribe(
      (data) => {
        this.serviceConsultation.id = data.id;
        this.serviceConsultation.nomService = data.nomService;
        this.serviceConsultation.typeService = data.typeService;
        this.serviceConsultation.salleAttenteId = data.salleAttente.id;
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

  listSalles(){

    this.salleAttenteService.getSallesList().subscribe(
      (data)=>{this.salleAttentes=data;},
      (error)=>{ setTimeout(()=>{
        if(error.status==401){
          this.route.navigate(['login']);
        };},1000);},
      ()=>{}
    )

  }


  editConsultant(service:ServiceConsultationRequest){




    service.typeService=this.edit.controls['type'].value!;
    service.nomService=this.edit.controls['nom'].value!;
    service.salleAttenteId= Number(this.edit.controls['salle'].value!);

    this.serviceConsultationService.editService(service).subscribe(
      (data)=>{this.serviceConsultation.id=data.id;
        this.serviceConsultation.nomService=data.nomService;
        this.serviceConsultation.typeService=data.typeService;
        this.serviceConsultation.salleAttenteId=data.salleAttente.id;
        },
      (error)=>{this.messageService.add({severity:'error', summary: 'Failed', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Modifier avec succée'});

        setTimeout(()=>{this.location.back()},1000);}
    )
  }



}
