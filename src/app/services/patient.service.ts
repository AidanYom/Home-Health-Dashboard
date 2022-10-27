import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseURL: string = "http://localhost:3001/";
  constructor(private http: HttpClient) {}

  addPatients(patientid: number, fname: string, lname: string, email: string, phone: string, dob: string, startDate:string,
     endDate:string,  street:string, city:string, zip:string, assignedNurse:string, treatmentDesc: string, org:number): Observable<any> {

    const headers = { 'content-type': 'application/json'}
    const body = {
      "patientid" : patientid,
      "fname" : fname,
      "lname" : lname,
      "dob" : dob,
      "email" : email,
      "phone" : phone,
      "startDate" : startDate,
      "endDate" : endDate,
      "street" : street,
      "city": city,
      "zip" : zip,
      "assignedNurse" : assignedNurse,
      "treatmentDesc" : treatmentDesc,
      "org" : org


    }
    

    return this.http.post(this.baseURL + 'new-patient', body,{'headers':headers})

  }

  getPatients(org:number) {
    const headers = { 'content-type': 'application/json'}
    const body = {
      "org" : org,

    }

    return this.http.post(this.baseURL + 'get-patients', body,{'headers':headers})

  }

  

}
