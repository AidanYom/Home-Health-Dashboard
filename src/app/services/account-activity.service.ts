import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountActivityService {
  noRequest = ""
  lostEmail!: BehaviorSubject<string>;
  username!: BehaviorSubject<string>;
  role!: BehaviorSubject<number>
  constructor() {
    this.lostEmail = new BehaviorSubject(this.noRequest);
    this.username = new BehaviorSubject("");
    this.role = new BehaviorSubject(0);
  }
  setLoginRole(role:number){
    this.role.next(role);
    localStorage.setItem("role", role.toString())
  }
  getLoginRole(){
    return localStorage.getItem("role")
  }
  setLoginName(username:string){
    this.username.next(username);
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
}
