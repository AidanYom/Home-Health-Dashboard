import { Component, NgModule, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { AccountActivityService } from '../services/account-activity.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})




export class AdminHomepageComponent implements OnInit {

  constructor(private router: Router, private accService: AccountActivityService) { }

  ngOnInit(): void {
  }

  navigateToAddNurse() {
    this.router.navigateByUrl('add-nurse');
  }
  navigateToAddPatient() {
    this.router.navigateByUrl('add-patient');
  }
  navigateToCalendar() {
    this.router.navigateByUrl('calendar');
  }
  getOrgName() {
    if(this.accService.getOrgName()){
      return this.accService.getOrgName();
    }
    return "";
  }

}
