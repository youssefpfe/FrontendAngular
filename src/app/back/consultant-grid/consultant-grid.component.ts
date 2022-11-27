import { Component, OnInit } from '@angular/core';
import {ConsultantService} from "../../services/consultant.service";
import {Consultant} from "../../common/Consultant";
import {Utilisateur} from "../../common/Utilisateur";
import {AuthService} from "../../shared/auth/auth.service";
import {Router} from "@angular/router";
declare var $: any;



@Component({
  selector: 'app-consultant-grid',
  templateUrl: './consultant-grid.component.html',
  styleUrls: ['./consultant-grid.component.css']
})
export class ConsultantGridComponent implements OnInit {
  userInfo?: Utilisateur;

  consultants : Consultant[]=[];
  /*title = 'TD';
  dtOptions: any = {};*/
  constructor(private consultantService:ConsultantService, private auth:AuthService,private route : Router) { }

  ngOnInit(): void {
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });

    this.listConsultant();

  }

  listConsultant(){

    this.consultantService.getConsultantsList().subscribe(
      (data)=>{this.consultants=data;},
    (error)=>{

       setTimeout(()=>{
        if(error.status==401){
      this.route.navigate(['login']);
    };},1000)

    },
    ()=>{
      var table = $('#TD').DataTable();


      table.destroy();

      $(function () {


        $('#TD').DataTable({
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
            "infoEmpty": "Aucunne information disponible",
            "infoFiltered": "(filtrer de _MAX_ total resultats)",
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

    this.consultantService.delete(id).subscribe(
      (data) =>{this.listConsultant();},
      (error) =>{this.listConsultant();}
    );
    this.listConsultant();

  }


}
