import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth/auth.service";
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService,private route : Router) { }

  ngOnInit(): void {
  }


  logout(){
    this.auth.logout().subscribe(()=>{
      window.localStorage.clear();this.route.navigate(['login']);
    });
  }
}
