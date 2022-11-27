import { Component, OnInit } from '@angular/core';
import {SalleAttente} from "../../../common/SalleAttente";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {Accueil} from "../../../common/Accueil";
import {AcceuilService} from "../../../services/acceuil.service";
import { Location } from '@angular/common'
@Component({
  selector: 'app-acceuil-edit',
  templateUrl: './acceuil-edit.component.html',
  styleUrls: ['./acceuil-edit.component.css'],
  providers:[MessageService]
})
export class AcceuilEditComponent implements OnInit {

  acceuil: Accueil = new Accueil();
  edit=this.fb.group({
    nom: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
  });
  constructor(private location: Location,private route : Router,private activatedroute: ActivatedRoute, private fb: FormBuilder, private acceuilService: AcceuilService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.getAcceuil(params.get('id'));})

    this.edit.controls.nom.setValue(this.acceuil.nom);
  }

  getAcceuil(id: string | null) {
    this.acceuilService.getAcceuilById(id).subscribe(
      (data) => {
        this.acceuil = data;

      },
      () => {
      },
      () => {
      }
    )
  }

  editAcceuil(accueil:Accueil){




    accueil.nom=this.edit.controls['nom'].value!;

    this.acceuilService.editAcceuil(accueil).subscribe(
      (data)=>{this.acceuil= data;
      },
      (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)},
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Modifier avec succée'});
        setTimeout(()=>{this.location.back()},1000);
      }
    )
  }

}
