import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {ServiceConsultationRequest} from "../../../common/ServiceConsultationRequest";
import {SalleAttente} from "../../../common/SalleAttente";
import {Location} from "@angular/common";

@Component({
  selector: 'app-salle-attente-edit',
  templateUrl: './salle-attente-edit.component.html',
  styleUrls: ['./salle-attente-edit.component.css'],
  providers:[MessageService]
})
export class SalleAttenteEditComponent implements OnInit {

  salleAttente: SalleAttente = new SalleAttente();
  edit=this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
    etage: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(2)]]
  });
  constructor(private route : Router,private location: Location,private activatedroute: ActivatedRoute, private fb: FormBuilder, private salleAttenteService: SalleAttenteService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.getSalle(params.get('id'));})

    this.edit.controls.nom.setValue(this.salleAttente.nom);
    this.edit.controls.etage.setValue(this.salleAttente.etage);
  }

  getSalle(id: string | null) {
    this.salleAttenteService.getSalleById(id).subscribe(
      (data) => {
        this.salleAttente = data;

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

  editSalle(salle:SalleAttente){




    salle.nom=this.edit.controls['nom'].value!;
    salle.etage=this.edit.controls['etage'].value!;

    this.salleAttenteService.editSalle(salle).subscribe(
      (data)=>{this.salleAttente= data;
      },
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Modifier avec succée'});
        setTimeout(()=>{this.location.back()},1000);
      }
    )
  }

}
