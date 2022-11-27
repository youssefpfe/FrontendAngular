import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../../common/Utilisateur";
import {Examen} from "../../../common/Examen";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/auth/auth.service";
import {ExamenService} from "../../../services/examen.service";
import {Assurance} from "../../../common/Assurance";
import {AssuranceService} from "../../../services/assurance.service";
declare var $: any;

@Component({
  selector: 'app-assurance-grid',
  templateUrl: './assurance-grid.component.html',
  styleUrls: ['./assurance-grid.component.css']
})
export class AssuranceGridComponent implements OnInit {
  d1!:any;
  d2!:any;

  userInfo?: Utilisateur;

  assurances : Assurance[]=[];
  constructor(private route : Router,private auth:AuthService,private assuranceService : AssuranceService) { }

  ngOnInit(): void {
    this.listAssurances();
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });


  }

  listAssurances(){

    this.assuranceService.getAssuranceList().subscribe(
      (data)=>{this.assurances=data;console.log(data)},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{
        var table = $('#assurances').DataTable();


        table.destroy();

        let that=this;


          $(function () {


            $('#assurances').DataTable({
              "paging": true,
              "lengthChange": true,
              "searching": true,
              "ordering": true,
              "info": true,
              "autoWidth": true,
              "responsive": true,
              "buttons": ["copy", "csv", "excel",
                {
                  extend:"pdf",
                  title: 'Listes Des Patients Assurés',
                  orientation: 'center',
                  pageSize: 'A4',

                  customize: function ( doc:  { header:any,content: {text:string, table: { widths: string[] }; }[]; } ) {
                    var du="du";
                    var a="à"
                    if(that.d1==undefined || that.d2==undefined){
                      that.d1="";
                      that.d2="";
                      du="";
                      a="";
                    }

                    doc.content[1].table.widths = [
                      '14.2857%',
                      '14.2857%',
                      '14.2857%',
                      '14.2857%',
                      '14.2857%',
                      '14.2857%',
                      '14.2857%'
                    ];
                    doc['header']=(function() {
                      return {
                        columns: [


                          {
                            alignment: 'left',
                            fontSize: 9,
                            text: "Hôpital Militaire Principal D\'Instruction de Tunis"
                          },
                          {
                            alignment: 'right',
                            fontSize: 10,
                            text: du + " "+ that.d1+ " " + a + " " + that.d2
                          }
                        ],
                        margin: 7
                      }
                    });
                    console.log(doc.content);
                  }
                }

                ,

                {
                  extend:"print",
                  title:'',
                  customize: function ( win: { document: { body: any; }; } ) {
                    var du="du";
                    var a="à"
                    if(that.d1==undefined || that.d2==undefined){
                      that.d1="";
                      that.d2="";
                      du="";
                      a="";
                    }
                    $(win.document.body)
                      .css( 'font-size', '10pt' )
                      .prepend(
                        '<h2 class="d-flex justify-content-center">Hôpital Militaire Principal D\'Instruction de Tunis</h2>' +
                        '<h4 class="d-flex justify-content-center">Listes Des Patients Assurés </h4>' +
                        '<h6 class="d-flex justify-content-center"> '+du+' '+that.d1+' '+a+' '+that.d2+'</h6>' +
                        '<br>'+
                        '<br>'

                      );



                  }}],


              "language": {
                "lengthMenu": "Afficher _MENU_ ",
                "zeroRecords": "Rien Trouver ",
                "info": "Affichage page _PAGE_ de _PAGES_",
                "infoEmpty": "Aucune information disponible",
                "infoFiltered": "(filtrer de _MAX_ total records)",
                "search": " <div style='margin-right:49%'>Rechercher:</div>",
                "paginate":{
                  "previous":"Précédent",
                  "next": "Prochain",
                  "last":"Dernier",
                  "first":"Premier",
                },
                "buttons": {
                  "copy": "Copier",
                  "colvis": "Visibilité des colonnes",
                  "print" : "Imprimer"
                }
              }

            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
          });



      }
    )

  }
  delete(id:any){

    this.assuranceService.delete(id).subscribe(
      (data) =>{},
      (error) =>{},
      ()=>{
        this.listAssurances();window.location.reload();
      }
    );


  }

  deleteAll(){
    if(confirm("Êtes-vous sûr(e) de vouloir supprimer tout?")){
    this.assuranceService.deleteAll().subscribe(
      (data) =>{},
      (error) =>{},
      ()=>{
        this.listAssurances();window.location.reload();
      }
    );
    }

  }

  getAssurancesByDate(d1:any,d2:any){
this.assuranceService.getAssuranceListByDates(d1,d2).subscribe(
  (data)=>{
    this.assurances=data;
    var table = $('#assurances').DataTable();


      table.destroy();
    let that=this;
    setTimeout(()=>{

      $(function () {


        $('#assurances').DataTable({
          "paging": true,
          "lengthChange": true,
          "searching": true,
          "ordering": true,
          "info": true,
          "autoWidth": true,
          "responsive": true,
          "buttons": ["copy", "csv", "excel",
            {
              extend:"pdf",
              title: 'Listes Des Patients Assurés',
              orientation: 'center',
              pageSize: 'A4',

              customize: function ( doc:  { header:any,content: {text:string, table: { widths: string[] }; }[]; } ) {
                var du="du";
                var a="à"
                if(that.d1==undefined || that.d2==undefined){
                  that.d1="";
                  that.d2="";
                  du="";
                  a="";
                }

                doc.content[1].table.widths = [
                  '14.2857%',
                  '14.2857%',
                  '14.2857%',
                  '14.2857%',
                  '14.2857%',
                  '14.2857%',
                  '14.2857%'
                ];
                doc['header']=(function() {
                  return {
                    columns: [


                      {
                        alignment: 'left',
                        fontSize: 9,
                        text: "Hôpital Militaire Principal D\'Instruction de Tunis"
                      },
                      {
                        alignment: 'right',
                        fontSize: 10,
                        text: du + " "+ that.d1+ " " + a + " " + that.d2
                      }
                    ],
                    margin: 7
                  }
                });
                console.log(doc.content);
              }
            }

            ,

            {
              extend:"print",
              title:'',
              customize: function ( win: { document: { body: any; }; } ) {
                var du="du";
                var a="à"
                if(that.d1==undefined || that.d2==undefined){
                  that.d1="";
                  that.d2="";
                  du="";
                  a="";
                }
                $(win.document.body)
                  .css( 'font-size', '10pt' )
                  .prepend(
                    '<h2 class="d-flex justify-content-center">Hôpital Militaire Principal D\'Instruction de Tunis</h2>' +
                    '<h4 class="d-flex justify-content-center">Listes Des Patients Assurés </h4>' +
                    '<h6 class="d-flex justify-content-center"> '+du+' '+that.d1+' '+a+' '+that.d2+'</h6>' +
                    '<br>'+
                    '<br>'

                  );



              }}],


          "language": {
            "lengthMenu": "Afficher _MENU_ ",
            "zeroRecords": "Rien Trouver ",
            "info": "Affichage page _PAGE_ de _PAGES_",
            "infoEmpty": "Aucune information disponible",
            "infoFiltered": "(filtrer de _MAX_ total records)",
            "search": " <div style='margin-right:49%'>Rechercher:</div>",
            "paginate":{
              "previous":"Précédent",
              "next": "Prochain",
              "last":"Dernier",
              "first":"Premier",
            },
            "buttons": {
              "copy": "Copier",
              "colvis": "Visibilité des colonnes",
              "print" : "Imprimer"
            }
          }

        }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      });

    },500);

  }

)

  }

  verifyDate(){
    if(this.d1>this.d2){
      alert("Veillez choisir une date superieur a la Date de Fin")
      this.d2=this.d1;
    }
}


}
