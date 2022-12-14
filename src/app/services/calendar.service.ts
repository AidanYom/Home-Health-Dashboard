import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  baseURL: string = "http://localhost:3001/";
  constructor(private http: HttpClient) { }

  getCalendarEvents(org:number) {
    const headers = { 'content-type': 'application/json'}
    const body = {
      org: org
    }

    return this.http.post(this.baseURL + 'get-calendar-event', body,{'headers':headers})

  }

  addEvent(id: any, title:string, date_time_start : string, date_time_end:string, reccuring: string, nurse_name:string, patient_name:string, org:number): Observable<any>{
    const headers = { 'content-type': 'application/json'}


    const body = {
      id: id,
      title: title,
      date_time_start: date_time_start,
      date_time_end: date_time_end,
      reccuring: reccuring,
      nurse_name: nurse_name,
      patient_name: patient_name,
      org : org
    }

    return this.http.post(this.baseURL + 'new-calendar-event', body,{'headers':headers})
  }

  deleteEvent(id: any): Observable<any> {
    // console.log('inDeleteeeee')
    const headers = { 'content-type': 'application/json'}


    const body = {
      id: id
    }

    return this.http.post(this.baseURL + 'delete-calendar-event', body,{'headers':headers})

  }


  


}
