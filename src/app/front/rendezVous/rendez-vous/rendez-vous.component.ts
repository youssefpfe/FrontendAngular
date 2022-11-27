import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {FormBuilder, Validators} from "@angular/forms";
import {PersonnelMedicalService} from "../../../services/personnel-medical.service";
import {ServiceConsultationService} from "../../../services/service-consultation.service";
import {SalleAttenteService} from "../../../services/salle-attente.service";
import {MessageService} from "primeng/api";
import {AcceuilService} from "../../../services/acceuil.service";
import {Router} from "@angular/router";
import {Utilisateur} from "../../../common/Utilisateur";
import {AuthService} from "../../../shared/auth/auth.service";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css'],
  providers:[MessageService]
})
export class RendezVousComponent implements OnInit {

  @Output() cons= new EventEmitter <number>();
  userInfo?: Utilisateur;
  service2 :ServiceConsultation=new ServiceConsultation();
  serviceConsultations : ServiceConsultation[]=[];
  service!:ServiceConsultation;
  consultantId!:number;

  add=this.fb.group({


    serv: ['',[Validators.required]],
    cons: ['',[Validators.required]]

  })
  constructor(private route :Router,private fb: FormBuilder,private serviceConsultationService : ServiceConsultationService,private personnelService : PersonnelMedicalService,private messageService:MessageService,private auth: AuthService) { }

  ngOnInit(): void {
    this.listServices();
    this.userInfo=this.auth.loadUserFromLocalStorage();
    this.getPersonnel(this.userInfo.id);
console.log(this.userInfo);
  }

  listServices(){

    this.serviceConsultationService.getServicesList().subscribe(
      (data)=>{
        this.serviceConsultations=data;
  },
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };
          },1000);
      },
      ()=>{}
    )

  }

  getPersonnel(id:any){
    this.personnelService.getPersonnelById(id).subscribe(
      (data)=>{
          this.serviceConsultationService.getServiceById(data?.serviceConsultation.id).subscribe(
            (data2)=>{
              this.service=data2;
            }
          );

      }
    )
  }


  changingId(){

   if(this.service.consultants[0] !=undefined){
     this.consultantId=this.service.consultants[0].id
   }else{
     this.consultantId=-1
   }

  }



}
