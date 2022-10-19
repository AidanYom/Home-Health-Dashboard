import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

/** @title Form field with error messages */
@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.css']
})

export class ForgetPasswordPageComponent implements OnInit  {

  constructor(private authService: AuthServiceService, private router: Router) { }
  #email: string = '';
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
  }

  onClick() {
    this.authService.forgetPassword(this.email.value).subscribe(
      data => {
        console.log(data)
        if (data.status === '200') {
          alert('true')
        }
        else {
          alert("The email does not exist!")
        }
      }
    )
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email form' : '';
  }

}
