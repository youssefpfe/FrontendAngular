import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../common/Utilisateur";
import {SalleAttente} from "../../../common/SalleAttente";
import {AuthService} from "../../../shared/auth/auth.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {Examen} from "../../../common/Examen";
import {ExamenService} from "../../../services/examen.service";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-examen-grid',
  templateUrl: './examen-grid.component.html',
  styleUrls: ['./examen-grid.component.css']
})
export class ExamenGridComponent implements OnInit {


  userInfo?: Utilisateur;

  examens : Examen[]=[];
  constructor(private route : Router,private auth:AuthService,private examenService : ExamenService) { }

  ngOnInit(): void {
    this.listExamens();
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });


  }

  listExamens(){

    this.examenService.getExamenList().subscribe(
      (data)=>{this.examens=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{
        var table = $('#exams').DataTable();


        table.destroy();

        $(function () {


          $('#exams').DataTable({
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

    this.examenService.delete(id).subscribe(
      (data) =>{},
      (error) =>{this.listExamens();},
      ()=>{this.listExamens();}
    );


  }


}
