import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNurseService {

  baseURL: string = "http://localhost:3001/";

  constructor(private http: HttpClient) {}
  
  getNurses(org:string): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body = {
      "org" : org,

    }

    return this.http.post(this.baseURL + 'get-nurses', body,{'headers':headers})

  }


  
}
