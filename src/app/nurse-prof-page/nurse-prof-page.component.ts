import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface Nurse {
 
  'Full Name' : string;
  'Expertise': string;
  'no_of_patients_today': number;
  'Phone': string;
  'id' : number;
}

@Component({
  selector: 'app-nurse-prof-page',
  templateUrl: './nurse-prof-page.component.html',
  styleUrls: ['./nurse-prof-page.component.css']
})
export class NurseProfPageComponent implements OnInit {
  
  
  row: any;
  full_name: any;
  email: any;
  phone: any;
  expertise:any;


  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    this.row = (this.router.getCurrentNavigation()!.extras.state);
  }
  nurse: Nurse[] = [];
  ngOnInit(): void {
    this.full_name = this.row["Full Name"];
    this.email = this.row["Email"];
    this.phone = this.row["Phone"];
    this.expertise = this.row["Expertise"];

  }
  

}
