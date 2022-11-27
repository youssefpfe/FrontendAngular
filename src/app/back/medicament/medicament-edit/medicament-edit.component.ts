import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {Examen} from "../../../common/Examen";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ExamenService} from "../../../services/examen.service";
import {MedicamentService} from "../../../services/medicament.service";
import {Medicament} from "../../../common/Medicament";
import {Location} from "@angular/common";

@Component({
  selector: 'app-medicament-edit',
  templateUrl: './medicament-edit.component.html',
  styleUrls: ['./medicament-edit.component.css'],
  providers:[MessageService]
})
export class MedicamentEditComponent implements OnInit {

  medicament: Medicament = new Medicament();
  edit=this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    duree: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(15),Validators.pattern('(?:\\d+(?:\\.\\d{1})?|\\.\\d{1})')]]
  });
  constructor(private route : Router,private location: Location,private activatedroute: ActivatedRoute, private fb: FormBuilder, private medicamentService: MedicamentService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.getMedicament(params.get('id'));})

    this.edit.controls.nom.setValue(this.medicament.nomMedicament);
    this.edit.controls.duree.setValue(this.medicament.dureeDePrise.toString());
  }

  getMedicament(id: string | null) {
    this.medicamentService.getMedicamentById(id).subscribe(
      (data) => {
        this.medicament = data;

      },
      () => {
      },
      () => {
      }
    )
  }

  editMedicament(medicament:Medicament){




    medicament.nomMedicament=this.edit.controls['nom'].value!;
    medicament.dureeDePrise=this.edit.controls['duree'].value!;

    this.medicamentService.editMedicament(medicament).subscribe(
      (data)=>{this.medicament= data;
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
