import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private patientService : PatientService, private router : Router) { }

  first_name = '';
  last_name = '';
  email: string = '';
  phone: string = '';
  street: string = '';
  city: string = '';
  zip: string = '';
  nurse: string = '';
  treatment: string = '';
  

  ngOnInit(): void {
  }

  addPatient(): void {
    this.patientService.addPatients(-1, this.first_name, this.last_name, this.email, this.phone, "9/9/9999", "9/9/9999", "9/9/9999", this.street, this.city, this.zip, "Lebron James", "sickness").subscribe(
      data => {
        if (data.status == 200) {
          console.log("success!")
        }
      }
    )
    this.router.navigateByUrl('admin');  
  }

}

