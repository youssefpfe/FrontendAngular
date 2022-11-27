import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../common/Utilisateur";
import {PersonnelMedical} from "../../../common/PersonnelMedical";
import {PersonnelMedicalService} from "../../../services/personnel-medical.service";
import {AuthService} from "../../../shared/auth/auth.service";
import {Patient} from "../../../common/Patient";
import {PatientService} from "../../../services/patient.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css'],
  providers:[MessageService]
})
export class PatientGridComponent implements OnInit {

  userInfo?: Utilisateur;

  patients : Patient[]=[];
  serv:boolean=false;
  pay:boolean=false;
  constructor(private route:Router,private messageService:MessageService,private patientService:PatientService, private auth:AuthService) { }

  ngOnInit(): void {

      this.userInfo = this.auth.loadUserFromLocalStorage();

      for(let u of this.userInfo.roles) {

        if (u == "ROLE_SERVICECONSULTATION") {
this.serv=true;
this.pay=false;
        }else if(u == "ROLE_PAIEMENT"){
          this.serv=false;
          this.pay=true;

        }
      };


    this.listPatient();



  }



  listPatient(){

    this.patientService.getPatientsList().subscribe(
      (data)=>{this.patients=data;},
      (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        },
      ()=>{
        var table = $('#patient').DataTable();


        table.destroy();


        $(function () {

          $('#patient').DataTable({
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

    this.patientService.delete(id).subscribe(
      (data) =>{this.listPatient();},
      (error) =>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
        this.listPatient();
      }
    );


  }
}
