import { Component, OnInit } from '@angular/core';
import {ServiceConsultationService} from "../../services/service-consultation.service";
import {StatistiqueService} from "../../services/statistiques.service";
import {PriseRdv} from "../../common/PriseRdv";



@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})

export class StatistiquesComponent implements OnInit {

  //data for testing the chart
   data:any[] = []



  //parameters for the chart decoration
  //view:any[] = [700,370];
  /*colorScheme ={
    domain:['#704FC4','#48852C','#867A3D']
  };*/
  schemeType:string ='ordinal'; //'ordinal' or 'linear'
  gradient:boolean=false;
  xAxis:boolean=true;
  yAxis:boolean=true;
  legendTitle:string='legend Title';
  legendTitleMulti:string="Legende";
  legendPosition:string="Right"; //'right' or 'below'
  legend:boolean=true;
  showXAxisLabel:boolean=true;
  showYAxisLabel:boolean=true;
  xAxisLabel:string="date";
  yAxisLabel:string="nombre";
  animations:boolean=true;
  showGridLines:boolean=true;
  showDataLabel:boolean=true; //shows data value on the line
  tooltipDisabled:boolean=false;
  patientassure!:any;
  d1!:any;
  d2!:any;
  prise:PriseRdv[]=[];
  consult!:any[];
  consultationDates!:any[];

  constructor(private serviceStat : StatistiqueService) { }

  ngOnInit(): void {
    this.getStats(this.d1,this.d2);
    this.getConsByServ();
  }

  getConsByServ(){

    this.serviceStat.getConsultationsByServices().subscribe((data3)=>{


      let final=[];

      for(let d of data3){

        let gooddata={name:"",series:[{value:0,name:""}]};
        gooddata.series.splice(gooddata.series.indexOf({value:0,name:""}),1);
        gooddata.name=d.names;
        for(let c of d.consultations) {
          let series1={value:0,name:""}
          let date=new Date(c.dateConsultation)
          let month=date.getMonth()+1
          series1.name = date.getDate()+"/"+month+"/"+date.getFullYear();

          series1.value = 1;


          for (let s of gooddata.series) {
            if (s.name === series1.name) {

              series1.value=s.value+1;
              gooddata.series.splice(gooddata.series.indexOf(s),1);

            }

          }
          gooddata.series.push(series1);


        }
        final.push(gooddata);
        gooddata={name:"",series:[{value:0,name:""}]};
      }
      this.consult=final;
      this.data=final;
      //console.log(final);

    })

  }


  getStats(d1:any,d2:any){
this.serviceStat.getCountAssuree().subscribe(
  (data)=>{
    this.patientassure=data;
   this.serviceStat.getPriseRDVSByDates(d1,d2).subscribe(
     (data2)=>{
       this.prise=data2;

       this.serviceStat.getConsultationsByDates(d1,d2).subscribe(
         (data3)=>{
           this.consultationDates=data3;


         }


       );
     }


   );
},
  ()=>{}
)
  }
}
