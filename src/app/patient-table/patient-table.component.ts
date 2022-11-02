import { Component, OnInit, ViewChild} from '@angular/core';
import { PatientService } from '../services/patient.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface Patient {
  "patientid" : number,
  "fullName": string
  "dob" : string,
  "email" : string,
  "phone" : string,
  "startDate" : string,
  "endDate" : string,
  "street" : string,
  "city": string,
  "zip" : string,
  "assignedNurse" : string,
  "treatmentDesc" : string,
  "org" : number
}

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css']
})
export class PatientTableComponent implements OnInit {

  org = 1;
  constructor(private patientService: PatientService, private _liveAnnouncer: LiveAnnouncer, private router: Router) { }

  displayedColumns: string[] = ['FullName', 'AssignedNurse', 'Treatment', 'Phone'];

  dataSource = new MatTableDataSource<Patient>([]);

  clickedRows = new Set<Patient>();
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    //this.dataSource = NURSE_DATA;
    const PATEINT_DATA: Patient[] = []
    console.log("yo");
    this.patientService.getPatients(this.org)
    .subscribe(data => {
      const temp = (JSON.stringify(data));
      const data_json = JSON.parse(temp);
      
      for (let i = 0; i < data_json.data.length; i++) {
        const row: Patient = {
          'patientid' : data_json.data[i].patientId,
          'fullName' : data_json.data[i].firstName + ' ' + data_json.data[i].lastName,
          'dob' : data_json.data[i].dateOfBirth,
          "email" : data_json.data[i].email,
          "phone" : data_json.data[i].phone,
          "startDate" : data_json.data[i].startDate,
          "endDate" : data_json.data[i].endDate,
          "street" : data_json.data[i].streetAddr,
          "city": data_json.data[i].cityAddr,
          "zip" : data_json.data[i].zipAddr,
          "assignedNurse" : data_json.data[i].assigned_nurse,
          "treatmentDesc" : data_json.data[i].treatmentDescription,
          "org" : data_json.data[i].orgId
        }

        PATEINT_DATA.unshift(row);
        

      }
      this.dataSource = new MatTableDataSource<Patient>(PATEINT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

    console.log(PATEINT_DATA);

  }

  onRowClick(row: any) {
    //console.log(row)
    this.router.navigateByUrl("/profpage", { state: row})
  }

  patientSearch(event : Event) {
    const search = (event.target as HTMLInputElement).value;

    this.dataSource.filter = search.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
