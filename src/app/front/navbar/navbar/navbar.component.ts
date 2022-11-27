import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService,private route : Router) { }

  ngOnInit(): void {

  }

  logout(){
    this.auth.logout().subscribe(()=>{
      window.localStorage.clear();this.route.navigate(['login']);
    });
  }

}
