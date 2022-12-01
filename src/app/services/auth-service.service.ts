import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmailValidator, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseURL: string = "http://localhost:3001/";
  role_num: number = 3;

  constructor(private http: HttpClient) { }

  requestReset(email:String): Observable<any> {
    const body = {
      "email" : email
    }
    return this.http.post(`${this.baseURL}/req-reset-password`, body);
  }

  resetPassword(email: String, newPassword: String):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body = {
      "email" : email,
      "newPassword": newPassword
    }
    // console.log(body)
    return this.http.post(this.baseURL + 'users/resetPassword', body, {'headers':headers});
  }

  login(email:string, password:string): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body = {
      "email" : email,
      "password": password
    }
    // console.log(body)
    return this.http.post(this.baseURL + 'users/login', body,{'headers':headers})
  }

  createUser(email:string, password:string, lname:string, role:string, fname:string): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    
    if (role === 'admin') {
      this.role_num = 1
    }
    else if (role === 'nurse') {
      this.role_num = 2
    }

    const body = {
      "email" : email,
      "password": password,
      "lname" : lname,
      "fname" : fname,
      "role" : this.role_num
    }
    // console.log(body)
    return this.http.post(this.baseURL + 'users', body,{'headers':headers})
  }

  forgetPassword(email:String): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body = {
      "email" : email
    }
    // console.log(body)
    return this.http.post(this.baseURL + 'users/sendEmail', body,{'headers':headers})
  }

  getIsLoggedIn(): boolean {
    if(localStorage.getItem('is_logged_in') === 'true'){
      return true;
    }
    return false;
  }

  setIsLoggedIn(status:boolean): void {
    localStorage.setItem('is_logged_in', status.toString());
  }

  getOrgName(orgId:number): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = {
      "orgId": orgId
    }
    return this.http.post(this.baseURL + 'get-orgname', body, {'headers':headers})
  }


}


/*
addPerson(person:Person): Observable<any> {
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(person);
  // console.log(body)
  return this.http.post(this.baseURL + 'people', body,{'headers':headers})
} */
