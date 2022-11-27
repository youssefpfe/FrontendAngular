import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/auth/auth.service";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {Utilisateur} from "../../../common/Utilisateur";
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {SalleAttente} from "../../../common/SalleAttente";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-salle-attente-grid',
  templateUrl: './salle-attente-grid.component.html',
  styleUrls: ['./salle-attente-grid.component.css']
})
export class SalleAttenteGridComponent implements OnInit {

  userInfo?: Utilisateur;

  salleAttentes : SalleAttente[]=[];
  constructor(private route : Router,private auth:AuthService,private salleAttenteService : SalleAttenteService) { }

  ngOnInit(): void {
    this.listSalles();
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });


  }

  listSalles(){

    this.salleAttenteService.getSallesList().subscribe(
      (data)=>{this.salleAttentes=data;console.log(data)},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{
        var table = $('#salles').DataTable();


        table.destroy();

        $(function () {


          $('#salles').DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": true,
            "responsive": true,



            "language": {
              "lengthMenu": "Afficher _MENU_ ",
              "zeroRecords": "Rien Trouver ",
              "info": "Affichage page _PAGE_ de _PAGES_",
              "infoEmpty": "Aucune information disponible",
              "infoFiltered": "(filtrer de _MAX_ total records)",
              "search": " <div style='margin-right:49%'>Rechercher:</div>",

              "paginate":{
                "previous":"Précédent",
                "next": "Prochain",
                "last":"Dernier",
                "first":"Premier",
              }
            }

          });
        });

      }
    )

  }
  delete(id:any){

    this.salleAttenteService.delete(id).subscribe(
      (data) =>{},
      (error) =>{this.listSalles();},
      ()=>{this.listSalles();}
    );


  }




}
