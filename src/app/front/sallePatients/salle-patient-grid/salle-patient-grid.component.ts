import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../common/Utilisateur";
import {Patient} from "../../../common/Patient";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {PatientService} from "../../../services/patient.service";
import {AuthService} from "../../../shared/auth/auth.service";
import {PersonnelMedical} from "../../../common/PersonnelMedical";
import {PersonnelMedicalService} from "../../../services/personnel-medical.service";

@Component({
  selector: 'app-salle-patient-grid',
  templateUrl: './salle-patient-grid.component.html',
  styleUrls: ['./salle-patient-grid.component.css'],
  providers:[MessageService]
})
export class SallePatientGridComponent implements OnInit {


  userInfo?: Utilisateur;
  personnel:PersonnelMedical=new PersonnelMedical();
  patients : Patient[]=[];
  serv:boolean=false;
  pay:boolean=false;
  constructor(private route:Router,private messageService:MessageService,private personnelService:PersonnelMedicalService,private patientService:PatientService, private auth:AuthService) { }

  ngOnInit(): void {

    this.userInfo = this.auth.loadUserFromLocalStorage();
this.getpersonnel(this.userInfo.id);
    for(let u of this.userInfo.roles) {

      if (u == "ROLE_SERVICECONSULTATION") {
        this.serv=true;
        this.pay=false;
      }else if(u == "ROLE_PAIEMENT"){
        this.serv=false;
        this.pay=true;

      }
    };


  }

getpersonnel(id:any){
    this.personnelService.getPersonnelById(id).subscribe(
      (data)=>{
        if(data.salleAttente.id != null) {
          this.listPatient(data.salleAttente.id);
        }

        }
    )
}

  listPatient(id:any){

    this.patientService.getPatientBySalleId(id).subscribe(
      (data)=>{this.patients=data;console.log(data)},
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
              "zeroRecords": "Pas De Patients ",
              "info": "Affichage page _PAGE_ de _PAGES_",
              "infoEmpty": "Aucune information disponible",
              "infoFiltered": "(filtrer de _MAX_ patients)",
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

}
