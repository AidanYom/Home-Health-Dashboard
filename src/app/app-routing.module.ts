import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';

import { SignupPageComponent } from './signup/signup-page/signup-page.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
export const routingComponents = [LoginPageComponent, AdminHomepageComponent, SignupPageComponent, ForgetPasswordPageComponent]