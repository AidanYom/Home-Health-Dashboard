import { Component, Input, OnInit } from '@angular/core';
import { ForgetPasswordPageComponent } from '../forget-password-page/forget-password-page.component';
@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})

export class ResetPasswordPageComponent implements OnInit {

  constructor() {}
  @Input() email!: String;
  newPassword!: String
  confirmPassword!: String
  passwordLen!: number

  ngOnInit(): void { }
  newP(event: any){
    this.newPassword = event.target.value
  }
  confirmP(event: any){
    this.confirmPassword = event.target.value
  }
  reset(){
    if(this.newPassword===undefined){
      alert("Password Can't Be Blank")
      console.log("Please type in your new password")
      return
    } 
    if(this.confirmPassword!==this.newPassword){
      alert("Please Match Confirm Password and New Password")
    } else{
      alert("Password Reset Successfull")
    }
  }
}
