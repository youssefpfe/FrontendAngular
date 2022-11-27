import { Component, OnInit } from '@angular/core';
import {SalleAttente} from "../../../common/SalleAttente";
import {FormBuilder, Validators} from "@angular/forms";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {ExamenRequest} from "../../../common/ExamenRequest";
import {ExamenService} from "../../../services/examen.service";
import {Examen} from "../../../common/Examen";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-examen-add',
  templateUrl: './examen-add.component.html',
  styleUrls: ['./examen-add.component.css'],
  providers:[MessageService]
})
export class ExamenAddComponent implements OnInit {


  examen : ExamenRequest =new ExamenRequest();
  add=this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    prix: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(15),Validators.pattern('(?:\\d+(?:\\.\\d{3})?|\\.\\d{3})')]]
  });
  constructor(private route : Router,private location: Location,private fb: FormBuilder,private examenService : ExamenService,private messageService:MessageService) { }

  ngOnInit(): void {
  }
  addExamen(examen:ExamenRequest){


    examen.nomExamen=this.add.controls['nom'].value!;
    examen.prixExamen=Number(this.add.controls['prix'].value!);



    this.examenService.addExamen(examen).subscribe(
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

}
