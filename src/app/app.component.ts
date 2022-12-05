import { Component } from '@angular/core';
import {Utilisateur} from "./common/Utilisateur";
import {AuthService} from "./shared/auth/auth.service";


import { Subscription } from 'rxjs';
import {NavigationStart, Router} from "@angular/router";
import {disableDebugTools, enableDebugTools} from "@angular/platform-browser";

export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'
  ]
})
export class AppComponent {
  userInfo?: Utilisateur;
  subscription: Subscription;
  constructor(private auth: AuthService,private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });

    console.warn(`🚨 Hopital Militaire 🚨 `);
    console.log = function():void{};
    console.debug = function():void{};
    console.warn = function():void{};
    console.info = function():void{};
    console.error = function():void{};
  }
  ngOnInit(): void {
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });
  }
  title = 'Hôpital Militaire';
}
