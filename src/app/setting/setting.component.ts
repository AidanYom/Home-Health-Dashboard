import { Component, Input, OnInit } from '@angular/core';
import { ForgetPasswordPageComponent } from '../forget-password-page/forget-password-page.component';
import { AuthServiceService } from '../services/auth-service.service';
import { AccountActivityService } from '../services/account-activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  username: any
  role: any
  email: any

  constructor(private router: Router, private authService: AuthServiceService, private accService: AccountActivityService) {
    accService.username.subscribe((username) =>{
      this.username = username
    })

    accService.email.subscribe((email) =>{
      this.email= email
    })
  }

  ngOnInit(): void {
    this.username = this.accService.getLoginName();
    if(this.accService.getLoginRole()==="1"){
      this.role = "admin"
    } else if(this.accService.getLoginRole()==="2"){
      this.role = "nurse"
    } else{
      this.role = "guest"
    }
    this.email = this.accService.getEmail();

  }

  resetPassword():void {
    this.router.navigateByUrl('/reset-password')
  }



}
