import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  constructor() {}
  pin = '4444'

  ngOnInit(): void { }
  onOtpChange(value: string){
    
    if(value === this.pin){
      console.log("your pin is correct")
    } else if (value.length === 4 && this.pin !== value) {
      console.log("incorrect pin")
    }

  }
  fillpin(){

  }
}
