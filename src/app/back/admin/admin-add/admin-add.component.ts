import { Component, OnInit } from '@angular/core';
import {Role} from "../../../common/user/Role";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AdminService} from "../../../services/admin.service";
import {SignupRequest} from "../../../common/user/SignupRequest";
import { Location } from '@angular/common'
import {Router} from "@angular/router";
@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
  providers: [MessageService]
})
export class AdminAddComponent implements OnInit {

  admin: SignupRequest= new SignupRequest();
  roles : string[]=Object.keys(Role).filter((item) => {
    return isNaN(Number(item));});


  add=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(4)]],
    nom: ['',[Validators.required,Validators.minLength(4)]],
    prenom: ['',[Validators.required,Validators.minLength(4)]],
    password: ['',[Validators.required,Validators.minLength(8)]],
    telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]+')]],
    email: ['',[Validators.required,Validators.email]],

    photo: ['',[Validators.pattern('http[s]?://.*')]],

    rol: ['',[Validators.required]]

  })
  constructor(private route : Router,private location: Location,private fb: FormBuilder,private adminService:AdminService,private messageService:MessageService) { }

  ngOnInit(): void {
  }

  addAdmin(admin:SignupRequest){


    let roles: string[]=[];
    roles.push(this.add.controls['rol'].value!)
    admin.username=this.add.controls['username'].value!;
    admin.nom=this.add.controls['nom'].value!;
    admin.prenom=this.add.controls['prenom'].value!;
    admin.photo=this.add.controls['photo'].value!;
    admin.telephone=this.add.controls['telephone'].value!;
    admin.email=this.add.controls['email'].value!;
    admin.password=this.add.controls['password'].value!;

    admin.roles=roles;

    this.adminService.addAdmin(admin).subscribe(
      (data)=>{console.log(data)},
      (error)=>{this.messageService.add({severity:'error', summary: 'Failed', detail: 'ERREUR'});
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
        },
      ()=>{this.messageService.add({severity:'success', summary: 'Success', detail: 'Ajouter avec succée'});}
    )
  }



  get nom(){
    return this.add.get('nom');
  }
  get photo(){
    return this.add.get('photo');
  }
  get prenom(){
    return this.add.get('prenom');
  }
  get email(){
    return this.add.get('email');
  }
  get telephone(){
    return this.add.get('telephone');
  }

}
