import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor() { }

  first_name = '';
  last_name = '';
  email: string = '';
  phone: string = '';
  street: string = '';
  city: string = '';
  zip: string = '';
  
  

  ngOnInit(): void {
  }

  addPatient(): void {

  }

}
