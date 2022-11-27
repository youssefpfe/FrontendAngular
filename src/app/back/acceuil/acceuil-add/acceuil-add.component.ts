import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import {SalleAttente} from "../../../common/SalleAttente";
import {FormBuilder, Validators} from "@angular/forms";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {AcceuilService} from "../../../services/acceuil.service";
import {Accueil} from "../../../common/Accueil";
import {Router} from "@angular/router";

@Component({
  selector: 'app-acceuil-add',
  templateUrl: './acceuil-add.component.html',
  styleUrls: ['./acceuil-add.component.css'],
  providers:[MessageService]
})
export class AcceuilAddComponent implements OnInit {

  acceuil: Accueil = new Accueil();
  add = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
  });

  constructor(private location: Location,private route : Router,private fb: FormBuilder, private acceuilService: AcceuilService, private messageService: MessageService) {
  }


  ngOnInit(): void {
  }

  addAcceuil(acceuil: Accueil) {


    acceuil.nom = this.add.controls['nom'].value!;


    this.acceuilService.addAcceuil(acceuil).subscribe(
      (data) => {

      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Ajouter avec succée'});
        setTimeout(()=>{this.location.back()},1000);
      }
    )

  }
}
