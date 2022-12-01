import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router) { }
  email: string = '';
  password: string = '';
  fname: string = '';
  lname: string = '';
  role: string = '';

  ngOnInit(): void {
  }

  onClick() {
    this.authService.createUser(this.email, this.password, this.lname, this.role, this.fname).subscribe(
      data => {
        // console.log(data)
        if (data.status === '200') {
          this.router.navigateByUrl('login')
        }
        else {
          alert('You may already have an account')
        }
      }
    )

    
  }
  backToLoginClick(){
    this.router.navigateByUrl('login')
  }

}
