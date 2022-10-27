import { Component, Input, OnInit } from '@angular/core';
import { ForgetPasswordPageComponent } from '../forget-password-page/forget-password-page.component';
import { AuthServiceService } from '../services/auth-service.service';
import { AccountActivityService } from '../services/account-activity.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})

export class ResetPasswordPageComponent implements OnInit {
  constructor(private authService: AuthServiceService, private accService: AccountActivityService, private router: Router) {}
  email = ""
  newPassword!: String
  confirmPassword!: String
  passwordLen!: number
  ngOnInit(): void {
    this.accService.lostEmail.subscribe(lostEmail=>{
      this.email = lostEmail
    })
  }

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
      this.authService.resetPassword(this.email, this.newPassword).subscribe(data=>{
        console.log(data);
        if(data.status==='200'){
          alert("Password Reset Successfull")
          this.accService.passwordFound()
        } else{
          alert("Action Failed")
        }
      });
      
    }
  }
  backToLoginClick(){
    this.router.navigateByUrl('login')
  }
}
