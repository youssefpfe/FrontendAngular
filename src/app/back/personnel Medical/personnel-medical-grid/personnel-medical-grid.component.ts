import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../common/Utilisateur";
import {Consultant} from "../../../common/Consultant";
import {PersonnelMedical} from "../../../common/PersonnelMedical";
import {ConsultantService} from "../../../services/consultant.service";
import {AuthService} from "../../../shared/auth/auth.service";
import {PersonnelMedicalService} from "../../../services/personnel-medical.service";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-personnel-medical-grid',
  templateUrl: './personnel-medical-grid.component.html',
  styleUrls: ['./personnel-medical-grid.component.css']
})
export class PersonnelMedicalGridComponent implements OnInit {
  userInfo?: Utilisateur;

  personnels : PersonnelMedical[]=[];
  constructor(private route : Router,private personnelService:PersonnelMedicalService, private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });

    this.listPersonnel();

  }



  listPersonnel(){

    this.personnelService.getPersonnelsList().subscribe(
      (data)=>{this.personnels=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{
        var table = $('#personnel').DataTable();


        table.destroy();
        $(function () {


          $('#personnel').DataTable({
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

    this.personnelService.delete(id).subscribe(
      (data) =>{this.listPersonnel();},
      (error) =>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        this.listPersonnel();
      }
    );


  }

}
