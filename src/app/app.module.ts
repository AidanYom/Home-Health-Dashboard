import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';

import { RouterEvent, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'admin', component: AdminHomepageComponent},
  {path: '', component:LoginPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminHomepageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
