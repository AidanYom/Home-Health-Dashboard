import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetNurseService } from '../services/get-nurse.service';

@Component({
  selector: 'app-add-nurse',
  templateUrl: './add-nurse.component.html',
  styleUrls: ['./add-nurse.component.css']
})
export class AddNurseComponent implements OnInit {

  constructor(private getNurseService : GetNurseService, private router : Router) { }

  first_name = '';
  last_name = '';
  email: string = '';
  phone: string = '';
  skill: string = '';

  ngOnInit(): void {
  }

  addNurse(): void {
    console.log(this.skill)
    this.getNurseService.addNurses(-1, this.first_name, this.last_name, this.email, this.phone, this.skill, 1).subscribe(
      data => {
        if (data.status == 200) {
          console.log("success!")
        }
      }
    )
    this.router.navigateByUrl('admin');  
  }

  cancel(){
    this.router.navigateByUrl('admin');
  }

}
