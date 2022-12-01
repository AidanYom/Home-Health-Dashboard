import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetNurseService {

  baseURL: string = "http://localhost:3001/";

  constructor(private http: HttpClient) {}
  
  getNurses(org:number): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body = {
      "org" : org,

    }

    return this.http.post(this.baseURL + 'get-nurses', body,{'headers':headers})

  }

  addNurses(nurseid: number, fname: string, lname: string, email: string, phone: string, skill: string, org:number): Observable<any> {

    const headers = { 'content-type': 'application/json'}
    const body = {
      "nurseid" : nurseid,
      "fname" : fname,
      "lname" : lname,
      "email" : email,
      "phone" : phone,
      "skill" : skill,
      "org" : org,
    }
    // console.log(skill)

    return this.http.post(this.baseURL + 'new-nurse', body,{'headers':headers})

  }


  
}
