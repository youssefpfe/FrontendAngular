import {Component, Input, LOCALE_ID, OnChanges, OnInit} from '@angular/core';
import {Ordonnance} from "../../../common/Ordonnance";
import {Consultant} from "../../../common/Consultant";
import {ConsultantService} from "../../../services/consultant.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-ordonnance-view',
  templateUrl: './ordonnance-view.component.html',
  styleUrls: ['./ordonnance-view.component.css'],
  providers: [ { provide: LOCALE_ID, useValue: "fr-FR" }]
})
export class OrdonnanceViewComponent implements OnInit, OnChanges {
  @Input() ordonnance !: Ordonnance;
  consultant!:Consultant;
  constructor(private consultantService:ConsultantService) { }

  ngOnInit(): void {
    console.log(this.ordonnance)
  }
 ngOnChanges(): void {
    console.log(this.ordonnance)
   this.getConsultant(this.ordonnance.consultant.id)
  }
  getConsultant(id:any){
  this.consultantService.getConsultantById(id).subscribe(
  (data)=>{this.consultant=data;}
)
  }


  print() {

    /*let pp =document.getElementById("ordprint")!.outerHTML;
    let mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow?.document.write(pp);
    mywindow?.document.close();
    mywindow?.focus();
    mywindow?.print();

    const btn= document.getElementById("ordprint");
    btn!.addEventListener('click', function(){
      window.print();
    });
*/

    var printContents = document.getElementById("ordprint")!.innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    document.body.innerHTML = originalContents;
    location.reload();


  }

}
