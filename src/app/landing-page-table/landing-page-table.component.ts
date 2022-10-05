import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { GetNurseService } from '../services/get-nurse.service';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';


export interface Nurse {
 
  'Full Name' : string;
  'Expertise': string;
  'no_of_patients_today': number;
  'Phone': string;
  'id' : number;
  'Email': any
}

// const NURSE_DATA: Nurse[] = [
//   {Name: 'Hydrogen', 'Patients Today': 1.0079, 'Phone Number': '123-456-7890'},
//   {Name: 'Helium', 'Patients Today': 4.0026, 'Phone Number': '123-456-7890'},
//   {Name: 'Lithium', 'Patients Today': 6.941, 'Phone Number': '123-456-7890'},
//   {Name: 'Beryllium', 'Patients Today': 9.0122, 'Phone Number': '123-456-7890'},
//   {Name: 'Boron', 'Patients Today': 10.811, 'Phone Number': '123-456-7890'},
//   {Name: 'Carbon', 'Patients Today': 12.0107, 'Phone Number': '123-456-7890'},
//   {Name: 'Nitrogen', 'Patients Today': 14.0067, 'Phone Number': '123-456-7890'},
//   {Name: 'Oxygen', 'Patients Today': 15.9994, 'Phone Number': '123-456-7890'},
//   {Name: 'Fluorine', 'Patients Today': 18.9984, 'Phone Number': '123-456-7890'},
//   { Name: 'Neon', 'Patients Today': 20.1797, 'Phone Number': '123-456-7890'},
// ];

@Component({
  selector: 'app-landing-page-table',
  templateUrl: './landing-page-table.component.html',
  styleUrls: ['./landing-page-table.component.css']
})


export class LandingPageTableComponent implements OnInit {
  //future get org from admin log in
  org = "IU Health Laffayette"
  constructor(private getNurseService: GetNurseService, private _liveAnnouncer: LiveAnnouncer, private router: Router) { }

  displayedColumns: string[] = ['Full Name', 'no_of_patients_today', 'Expertise', 'Phone'];

  dataSource = new MatTableDataSource<Nurse>([]);

  clickedRows = new Set<Nurse>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    //this.dataSource = NURSE_DATA;
    const NURSE_DATA: Nurse[] = []
    console.log("yo");
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

        NURSE_DATA.push(row)
        

      }
      this.dataSource = new MatTableDataSource<Nurse>(NURSE_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  onRowClick(row: any) {
    //console.log(row)
    this.router.navigateByUrl("/profpage", { state: row})
  }

  
}
