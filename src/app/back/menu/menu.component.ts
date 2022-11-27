import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../common/Utilisateur";
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userInfo!: Utilisateur;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {


    this.userInfo = this.auth.loadUserFromLocalStorage();


  }

}
