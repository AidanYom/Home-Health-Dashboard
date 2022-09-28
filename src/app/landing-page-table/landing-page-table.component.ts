import { Component, OnInit } from '@angular/core';


export interface Nurse {
  Name: string;
  'Patients Today': number;
  'Phone Number': string;
}

const NURSE_DATA: Nurse[] = [
  {Name: 'Hydrogen', 'Patients Today': 1.0079, 'Phone Number': '123-456-7890'},
  {Name: 'Helium', 'Patients Today': 4.0026, 'Phone Number': '123-456-7890'},
  {Name: 'Lithium', 'Patients Today': 6.941, 'Phone Number': '123-456-7890'},
  {Name: 'Beryllium', 'Patients Today': 9.0122, 'Phone Number': '123-456-7890'},
  {Name: 'Boron', 'Patients Today': 10.811, 'Phone Number': '123-456-7890'},
  {Name: 'Carbon', 'Patients Today': 12.0107, 'Phone Number': '123-456-7890'},
  {Name: 'Nitrogen', 'Patients Today': 14.0067, 'Phone Number': '123-456-7890'},
  {Name: 'Oxygen', 'Patients Today': 15.9994, 'Phone Number': '123-456-7890'},
  {Name: 'Fluorine', 'Patients Today': 18.9984, 'Phone Number': '123-456-7890'},
  { Name: 'Neon', 'Patients Today': 20.1797, 'Phone Number': '123-456-7890'},
];

@Component({
  selector: 'app-landing-page-table',
  templateUrl: './landing-page-table.component.html',
  styleUrls: ['./landing-page-table.component.css']
})


export class LandingPageTableComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['Name', 'Patients Today', 'Phone Number'];
  dataSource = NURSE_DATA;
  clickedRows = new Set<Nurse>();

  ngOnInit(): void {
  }

}
