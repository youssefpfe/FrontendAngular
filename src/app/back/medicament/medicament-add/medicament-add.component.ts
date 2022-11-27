import { Component, OnInit } from '@angular/core';
import {ExamenRequest} from "../../../common/ExamenRequest";
import {FormBuilder, Validators} from "@angular/forms";
import {ExamenService} from "../../../services/examen.service";
import {MessageService} from "primeng/api";
import {MedicamentRequest} from "../../../common/MedicamentRequest";
import {MedicamentService} from "../../../services/medicament.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-medicament-add',
  templateUrl: './medicament-add.component.html',
  styleUrls: ['./medicament-add.component.css'],
  providers:[MessageService]
})
export class MedicamentAddComponent implements OnInit {


  medicament : MedicamentRequest =new MedicamentRequest();
  add=this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    duree: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(8),Validators.pattern('(?:\\d+(?:\\.\\d{1})?|\\.\\d{1})')]]
  });
  constructor(private route : Router,private location: Location,private fb: FormBuilder,private medicamentService : MedicamentService,private messageService:MessageService) { }

  ngOnInit(): void {
  }
  addMedicament(medicament:MedicamentRequest){




    medicament.nomMedicament=this.add.controls['nom'].value!;
    medicament.dureeDePrise=this.add.controls['duree'].value!;



    this.medicamentService.addMedicament(medicament).subscribe(
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
