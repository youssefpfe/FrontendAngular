import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {SignupRequest} from "../../../common/user/SignupRequest";
import {Role} from "../../../common/user/Role";
import {FormBuilder, Validators} from "@angular/forms";
import {AdminService} from "../../../services/admin.service";
import {Consultant} from "../../../common/Consultant";
import {ServiceConsultation} from "../../../common/ServiceConsultation";
import {Utilisateur} from "../../../common/Utilisateur";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
  providers: [MessageService]
})
export class AdminEditComponent implements OnInit {



  admin: Utilisateur= new Utilisateur();
  roles : string[]=Object.keys(Role).filter((item) => {
    return isNaN(Number(item));});


  edit=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(4)]],
    nom: ['',[Validators.required,Validators.minLength(4)]],
    prenom: ['',[Validators.required,Validators.minLength(4)]],
    telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]+')]],
    email: ['',[Validators.required,Validators.email]],

    photo: ['',[Validators.pattern('http[s]?://.*')]],

    rol: ['',[Validators.required]]

  })
  constructor(private route : Router,private location: Location,private fb: FormBuilder,private adminService:AdminService,private messageService:MessageService,private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.getAdmin(params.get('id'));})



    this.edit.controls.username.setValue(this.admin.username);
    this.edit.controls.nom.setValue(this.admin.nom);
    this.edit.controls.prenom.setValue(this.admin.prenom);
    this.edit.controls.email.setValue(this.admin.email);
    this.edit.controls.telephone.setValue(this.admin.telephone);
    this.edit.controls.photo.setValue(this.admin.photo);

  }

  editAdmin(admin:Utilisateur){



    let roles: string[]=[];
    roles.push(this.edit.controls['rol'].value!)
    admin.username=this.edit.controls['username'].value!;
    admin.nom=this.edit.controls['nom'].value!;
    admin.prenom=this.edit.controls['prenom'].value!;
    admin.photo=this.edit.controls['photo'].value!;
    admin.telephone=this.edit.controls['telephone'].value!;
    admin.email=this.edit.controls['email'].value!;
    admin.roles=roles;

    this.adminService.editAdmin(admin).subscribe(
      (data)=>{this.admin=data;},
      (error)=>{this.messageService.add({severity:'error', summary: 'ERROR!', detail: error.error.message});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Modifier avec succée'});
        setTimeout(()=>{this.location.back()},1000);
      }
    )
  }

  getAdmin(id:string|null){
    this.adminService.getAdminById(id).subscribe(
      (data)=>{this.admin=data;},
      ()=>{},
      ()=>{}
    )
  }

}
