import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';


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
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { AddNurseComponent } from './add-nurse/add-nurse.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import {MatIconModule} from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { NurseCalendarComponent } from './nurse-calendar/nurse-calendar.component';


const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'admin', component: AdminHomepageComponent},
  {path: '', component:LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'profpage', component: NurseProfPageComponent},
  {path: 'add-nurse', component: AddNurseComponent}, //temporary until we get other components final and can just be passed into other components
  {path: 'forgetPassword', component: ForgetPasswordPageComponent},
  {path: 'add-patient', component:AddPatientComponent},
  {path: 'calendar', component:CalendarComponent},
  {path: 'reset-password', component:ResetPasswordPageComponent},
  {path: 'nurse-sched', component:NurseCalendarComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminHomepageComponent,
    SignupPageComponent,
    LandingPageTableComponent,
    NurseProfPageComponent,
    SidebarNavComponent,
    AddNurseComponent,
    AddPatientComponent,
    ForgetPasswordPageComponent,
    CalendarComponent,
    ResetPasswordPageComponent,
    NurseCalendarComponent,
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
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgOtpInputModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
