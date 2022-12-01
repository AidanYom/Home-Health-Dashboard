import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountActivityService {
  noRequest = ""
  lostEmail!: BehaviorSubject<string>;
  username!: BehaviorSubject<string>;
  email!: BehaviorSubject<string>;
  role!: BehaviorSubject<number>
  org!: BehaviorSubject<string>
  constructor() {
    this.lostEmail = new BehaviorSubject(this.noRequest);
    this.username = new BehaviorSubject("");
    this.role = new BehaviorSubject(0);
    this.org = new BehaviorSubject(this.noRequest);
    this.email = new BehaviorSubject("");
  }
  setEmail(email:string){
    //this.email.next(email);
    localStorage.setItem("email", email)
  }
  getEmail() {
    return localStorage.getItem("email")
  }
  setLoginRole(role:number){
    this.role.next(role);
    localStorage.setItem("role", role.toString())
  }
  getLoginRole(){
    return localStorage.getItem("role")
  }
  setLoginName(username:string){
    //this.username.next(username);
    localStorage.setItem("username", username)
  }
  getLoginName(){
    return localStorage.getItem("username")
  }
  requestForget(email:string){
    this.lostEmail.next(email)
  }
  passwordFound(){
    this.lostEmail.next(this.noRequest)
  }
  setOrgName(orgName:string){
    this.org.next(orgName);
    localStorage.setItem("orgName", orgName);
  }
  getOrgName(){
    return localStorage.getItem("orgName");
  }
}
