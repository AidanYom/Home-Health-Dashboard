import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';


/** @title Form field with error messages */
@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.css']
})

export class ForgetPasswordPageComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
