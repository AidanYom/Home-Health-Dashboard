import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


var moment = require('moment-timezone')
// moment.tz.setDefault("America/New_York");

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
  baseURL: string = "http://localhost:3001/";


  constructor(private http: HttpClient) {
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
  setLoginId(id:number){
    this.role.next(id);
    localStorage.setItem("loginId", id.toString())
  }
  getLoginId(){
    return Number(localStorage.getItem("loginId"));
  }
  logLogin(userId: number, orgId: number): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const time = (moment().tz("America/New_York").format('YYYY/MM/DD HH:mm:ss'));
    const body = {
      "id": userId,
      "org": orgId,
      "time": time
    }
    return this.http.post(this.baseURL + 'log_login', body, {'headers':headers})
  }
  setLoginEnd(): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const time = (moment().tz("America/New_York").format('YYYY/MM/DD HH:mm:ss'));
    const loginId = this.getLoginId();
    this.setLoginId(0); //user is logging out, must reset the loginId stored
    const body = {
      "loginId": loginId,
      "end_time": time
    }
    console.log("setting login end")
    console.log(this.baseURL + 'log_login_end')
    console.log(body)
    return this.http.post(this.baseURL + 'log_login_end', body, {'headers':headers})
  }
}
