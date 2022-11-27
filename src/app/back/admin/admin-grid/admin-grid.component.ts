import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../common/Utilisateur";
import {Consultant} from "../../../common/Consultant";
import {ConsultantService} from "../../../services/consultant.service";
import {AuthService} from "../../../shared/auth/auth.service";
import {AdminService} from "../../../services/admin.service";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-admin-grid',
  templateUrl: './admin-grid.component.html',
  styleUrls: ['./admin-grid.component.css']
})
export class AdminGridComponent implements OnInit {
  userInfo?: Utilisateur;

  admins : Utilisateur[]=[];
  constructor(private route : Router,private adminService:AdminService, private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });

    this.listAdmin();

  }


  listAdmin(){

    this.adminService.getAdminsList().subscribe(
      (data)=>{this.admins=data;},
      (error)=>{setTimeout(()=>{
        if(error.status==401){
          this.route.navigate(['login']);
        };},1000)},
      ()=>{
        var table = $('#admin').DataTable();


        table.destroy();

        $(function () {


          $('#admin').DataTable({
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

    this.adminService.delete(id).subscribe(
      (data) =>{this.listAdmin();},
      (error) =>{this.listAdmin();setTimeout(()=>{
        if(error.status==401){
          this.route.navigate(['login']);
        };},1000)}
    );

  }




}
