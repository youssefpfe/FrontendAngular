import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../common/Utilisateur";
import {Examen} from "../../../common/Examen";
import {AuthService} from "../../../shared/auth/auth.service";
import {ExamenService} from "../../../services/examen.service";
import {MedicamentService} from "../../../services/medicament.service";
import {Medicament} from "../../../common/Medicament";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-medicament-grid',
  templateUrl: './medicament-grid.component.html',
  styleUrls: ['./medicament-grid.component.css']
})
export class MedicamentGridComponent implements OnInit {


  userInfo?: Utilisateur;

  medicaments : Medicament[]=[];
  constructor(private route : Router,private auth:AuthService,private medicamentService : MedicamentService) { }

  ngOnInit(): void {
    this.listMedicaments();
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });


  }

  listMedicaments(){

    this.medicamentService.getMedicamentList().subscribe(
      (data)=>{this.medicaments=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{
        var table = $('#medocs').DataTable();


        table.destroy();
        $(function () {


          $('#medocs').DataTable({
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
              "infoFiltered": "(filtrer de _MAX_ resultats)",
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

    this.medicamentService.delete(id).subscribe(
      (data) =>{},
      (error) =>{this.listMedicaments();},
      ()=>{this.listMedicaments();}
    );


  }

}
