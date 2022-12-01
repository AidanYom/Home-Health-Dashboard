import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { Nurse } from '../landing-page-table/landing-page-table.component';
import { GetNurseService } from '../services/get-nurse.service';




@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private getNurseService : GetNurseService,private patientService : PatientService, private router : Router) { }

  nurses : Nurse[] = [];
  org = 1;

  first_name = '';
  last_name = '';
  email: string = '';
  phone: string = '';
  street: string = '';
  city: string = '';
  zip: string = '';
  nurse: string = '';
  treatment: string = '';
  startDate: string = '';
  endDate: string = '';
  dateOfBirth: string ='';
  

  ngOnInit(): void {
    this.getNurseService.getNurses(this.org)
    .subscribe(data => {
      
      for (let i = 0; i < data.data.length; i++) {
        const row: Nurse = {
          'Full Name' : data.data[i].firstName + ' ' + data.data[i].lastName,
          'no_of_patients_today' : 4,
          'Expertise' : data.data[i].skillDescription,
          'Phone': data.data[i].phone,
          'Email': data.data[i].email,
          'id' : data.data[i].n_Nurse_Id
        }

        this.nurses.unshift(row);
      }
    })
  }

  addPatient(): void {
    // console.log(this.org);
    this.patientService.addPatients(-1, this.first_name, this.last_name, this.email, this.phone, this.dateOfBirth, this.startDate, this.endDate, this.street, this.city, this.zip, this.nurse, this.treatment, this.org).subscribe(
      data => {
        if (data.status == 200) {
          // console.log("success!")
        }
      }
    )
    this.router.navigateByUrl('admin');  
  }
  cancel(){
    this.router.navigateByUrl('admin');
  }

}

