import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';

import { RouterEvent, RouterModule, Routes } from '@angular/router';
import { SignupPageComponent } from './signup/signup-page/signup-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LandingPageTableComponent } from './landing-page-table/landing-page-table.component';
import { NurseProfPageComponent } from './nurse-prof-page/nurse-prof-page.component';


const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'admin', component: AdminHomepageComponent},
  {path: '', component:LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'profpage', component: NurseProfPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminHomepageComponent,
    SignupPageComponent,
    LandingPageTableComponent,
    NurseProfPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
