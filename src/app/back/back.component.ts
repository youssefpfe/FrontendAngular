import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {browserRefresh} from "../app.component";
declare var $: any;
let x=0;
@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css','./back.component.css'
  ],
  encapsulation: ViewEncapsulation.None

})

export class BackComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {


    if(!browserRefresh && x===0){
      x=1;

      $('[data-widget="treeview"]').Treeview('init');
     $('[data-widget="sidebar-search"]').SidebarSearch('init');



    }






  }

}
