import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {SalleAttente} from "../../../common/SalleAttente";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {ExamenService} from "../../../services/examen.service";
import {ExamenRequest} from "../../../common/ExamenRequest";
import {Examen} from "../../../common/Examen";
import {Location} from "@angular/common";

@Component({
  selector: 'app-examen-edit',
  templateUrl: './examen-edit.component.html',
  styleUrls: ['./examen-edit.component.css'],
  providers:[MessageService]
})
export class ExamenEditComponent implements OnInit {

  examen: Examen = new Examen();
  edit=this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    prix: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(15),Validators.pattern('(?:\\d+(?:\\.\\d{3})?|\\.\\d{3})')]]
  });
  constructor(private route : Router,private location: Location,private activatedroute: ActivatedRoute, private fb: FormBuilder, private examenService: ExamenService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.getExamen(params.get('id'));})

    this.edit.controls.nom.setValue(this.examen.nomExamen);
    this.edit.controls.prix.setValue(this.examen.prixExamen.toString());
  }

  getExamen(id: string | null) {
    this.examenService.getExamenById(id).subscribe(
      (data) => {
        this.examen = data;

      },
      (error) => {
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      () => {
      }
    )
  }

  editSalle(examen:Examen){




    examen.nomExamen=this.edit.controls['nom'].value!;
    examen.prixExamen=Number(this.edit.controls['prix'].value!);

    this.examenService.editExamen(examen).subscribe(
      (data)=>{this.examen= data;
      },
      (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
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
