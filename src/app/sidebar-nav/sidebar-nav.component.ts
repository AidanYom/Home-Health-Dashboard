import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import * as e from 'express';
import { AppComponent } from '../app.component';
import { AccountActivityService } from '../services/account-activity.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  isopened:boolean = false;
  is_logged_in: boolean = false;
  username: any;
  role: any;
  firstname: any;
  lastname: any;
  constructor(private router: Router, private authService: AuthServiceService, private accService: AccountActivityService) { 
    console.log("update")
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.checkRoute();
      }
    })

    accService.username.subscribe((username) =>{
      this.username = username
    })

    accService.role.subscribe(role =>{
      if(role === "1"){
        this.role = "nurse"
      } else{
        this.role = "admin"
      }
    })
  }

  ngOnInit(): void {
    this.username = this.accService.getLoginName()
    if(this.accService.getLoginRole()==="1"){
      this.role = "nurse"
    } else{
      this.role = "admin"
    }
  }

  checkRoute(): void {
    this.is_logged_in = this.authService.getIsLoggedIn();
    if((this.router.url === '/' || this.router.url === '/login' || this.router.url === '/forgetPassword' || this.router.url === '/signup' ||this.router.url === '/reset-password')) {
      this.isopened = false;
    } else if(this.is_logged_in) {
      this.isopened = true;
    } else {
      this.router.navigateByUrl('/');
    }
  }

  logout(): void {
    this.authService.setIsLoggedIn(false);
    this.accService.setLoginName("");
    this.accService.setLoginRole("-1");
  }
}
