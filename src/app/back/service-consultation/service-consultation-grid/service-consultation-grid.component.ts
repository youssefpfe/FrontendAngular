import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/auth/auth.service";
import {Utilisateur} from "../../../common/Utilisateur";
import {Consultant} from "../../../common/Consultant";
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-service-consultation-grid',
  templateUrl: './service-consultation-grid.component.html',
  styleUrls: ['./service-consultation-grid.component.css']
})
export class ServiceConsultationGridComponent implements OnInit {

  userInfo?: Utilisateur;

  serviceConsultations : ServiceConsultation[]=[];
  constructor(private route : Router,private auth:AuthService,private serviceConsultationService : ServiceConsultationService) { }

  ngOnInit(): void {
    this.listServices();
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });


  }

  listServices(){

    this.serviceConsultationService.getServicesList().subscribe(
      (data)=>{this.serviceConsultations=data;},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{
        var table = $('#services').DataTable();


        table.destroy();

        $(function () {


          $('#services').DataTable({
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

    this.serviceConsultationService.delete(id).subscribe(
      (data) =>{},
      (error) =>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
        this.listServices();
      },
      ()=>{this.listServices();}
    );


  }

}
