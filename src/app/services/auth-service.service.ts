import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseURL: string = "http://localhost:3001/";

  constructor(private http: HttpClient) { }

  login(email:string, password:string): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body = {
      "email" : email,
      "password": password
    }
    console.log(body)
    return this.http.post(this.baseURL + 'users/login', body,{'headers':headers})
  }
}


/*
addPerson(person:Person): Observable<any> {
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(person);
  console.log(body)
  return this.http.post(this.baseURL + 'people', body,{'headers':headers})
} */
