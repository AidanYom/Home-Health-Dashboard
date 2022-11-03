import { Component, ElementRef, Input, OnInit, ViewChild, Output } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AccountActivityService } from '../services/account-activity.service';

/** @title Form field with error messages */
@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.css']
})

export class ForgetPasswordPageComponent implements OnInit  {
 
  constructor(private authService: AuthServiceService, private router: Router, private accService: AccountActivityService) { }
  #email: string = '';
  email = new FormControl('', [Validators.required, Validators.email]);
  pin = '444444'
  sentPin = false;
  ngOnInit(): void {
  }

  onClick() {
    this.authService.forgetPassword(this.email.value).subscribe(
      data => {
        console.log(data)
        if (data.status === '200') {
          alert('true')
          this.sentPin = true;
          this.accService.requestForget(this.email.value)
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
  backToLoginClick(){
    this.router.navigateByUrl('login')
  }
  onOtpChange(value: string){
    if(this.sentPin){
      if(value === this.pin){
        console.log("your pin is correct")
        this.router.navigateByUrl('/reset-password')
      } else if (value.length === 6 && this.pin !== value) {
        console.log("incorrect pin")
      } 
    }
    

  }

}
