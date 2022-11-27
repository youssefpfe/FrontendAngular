import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PriseRdvService} from "../../../services/prise-rdv.service";
import {PriseRdv} from "../../../common/PriseRdv";

@Component({
  selector: 'app-payement-add',
  templateUrl: './payement-add.component.html',
  styleUrls: ['./payement-add.component.css','./payement-add.component.scss']
})
export class PayementAddComponent implements OnInit {


priseRdvs:PriseRdv[]= [];
check:boolean=false;

constructor(private route : Router,private fb: FormBuilder,private activatedroute: ActivatedRoute,private serviceRDV :PriseRdvService) { }

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe((params) => {
      this.getRdvs(params.get('id'));});

  }

  getRdvs(id :any){
    this.serviceRDV.getAllPriseRdvByPatient(id).subscribe(
      (data) => {
        this.priseRdvs = data;

      },
      (error) => {
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000);
      },
      () => {
      });
  }
  checkall(){
    this.check=!this.check;
  if(this.check) {
    for (let r of this.priseRdvs) {
      r.isChecked = true;
    }
  }else{
    for (let r of this.priseRdvs) {
      r.isChecked = false;
    }
  }

  }

}
