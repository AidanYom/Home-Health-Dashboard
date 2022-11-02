import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { GetNurseService } from '../services/get-nurse.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Nurse {

  'Full Name': string;
  'Expertise': string;
  'no_of_patients_today': number;
  'Phone': string;
  'id': number;
  'Email': any
}

@Component({
  selector: 'app-nurse-table',
  templateUrl: './nurse-table.component.html',
  styleUrls: ['./nurse-table.component.css']
})
export class NurseTableComponent implements OnInit {

  //future get org from admin log in
  org = 1;
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
            'Full Name': data.data[i].firstName + ' ' + data.data[i].lastName,
            'no_of_patients_today': 4,
            'Expertise': data.data[i].skillDescription,
            'Phone': data.data[i].phone,
            'Email': data.data[i].email,
            'id': data.data[i].n_Nurse_Id
          }

          NURSE_DATA.unshift(row);


        }
        this.dataSource = new MatTableDataSource<Nurse>(NURSE_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      })

    console.log(NURSE_DATA);

  }

  onRowClick(row: any) {
    //console.log(row)
    this.router.navigateByUrl("/profpage", { state: row })
  }

  nurseSearch(event: Event) {
    const search = (event.target as HTMLInputElement).value;

    this.dataSource.filter = search.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


}
