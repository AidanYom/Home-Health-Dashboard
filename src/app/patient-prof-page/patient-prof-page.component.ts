import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../patient-table/patient-table.component';

@Component({
  selector: 'app-patient-prof-page',
  templateUrl: './patient-prof-page.component.html',
  styleUrls: ['./patient-prof-page.component.css']
})
export class PatientProfPageComponent implements OnInit {

 
  row: any;
  full_name: any;
  email: any;
  phone: any;
  treatment:any;


  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    this.row = (this.router.getCurrentNavigation()!.extras.state);
  }
  patient: Patient[] = [];
  ngOnInit(): void {
    this.full_name = this.row["fullName"];
    this.email = this.row["email"];
    this.phone = this.row["phone"];
    this.treatment = this.row["treatmentDesc"];

  }

  viewSched() {
    this.router.navigateByUrl("/patient-sched", { state: this.full_name})
  }
  

}
