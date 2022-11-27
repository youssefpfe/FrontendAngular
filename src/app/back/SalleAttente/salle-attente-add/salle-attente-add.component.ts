import { Component, OnInit } from '@angular/core';
import {ServiceConsultationRequest} from "../../../common/ServiceConsultationRequest";
import {SalleAttente} from "../../../common/SalleAttente";
import {FormBuilder, Validators} from "@angular/forms";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-salle-attente-add',
  templateUrl: './salle-attente-add.component.html',
  styleUrls: ['./salle-attente-add.component.css'],
  providers:[MessageService]
})
export class SalleAttenteAddComponent implements OnInit {


  salleAttente : SalleAttente=new SalleAttente();
  add=this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
    etage: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(2)]]
  });
  constructor(private route : Router,private location: Location,private fb: FormBuilder,private salleAttenteService : SalleAttenteService,private messageService:MessageService) { }

  ngOnInit(): void {
  }
  addSalle(salle:SalleAttente){




    salle.nom=this.add.controls['nom'].value!;
    salle.etage=this.add.controls['etage'].value!;



    this.salleAttenteService.addSalle(salle).subscribe(
      (data)=>{console.log(data)},
      (error)=>{this.messageService.add({severity:'failed', summary: 'Failed', detail: 'ERREUR'});
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


}
