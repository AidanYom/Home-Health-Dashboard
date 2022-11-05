import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AccountActivityService } from 'src/app/services/account-activity.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  @ViewChild('login') login! :ElementRef;
  constructor(private authService: AuthServiceService, private router: Router, private accService: AccountActivityService) { }
  email: string = '';
  password: string = '';
  shakeIt = false;
  shakeEmail = false;
  incorrectPassword = false;
  incorrectEmail = false;
  onClick() : void {
      this.login.nativeElement.blur();
      
      console.log(this.email)
      console.log(this.password)

      this.authService.login(this.email, this.password)
        .subscribe(data => {
          if (data.status === '400') { //incorrect credentials
            if (data.message === 'incorrect password') {
            
              this.incorrectPassword = true;
              this.shakeIt = true;
              setTimeout(() => {
                this.shakeIt = false;
              }, 300);
            }

            if (data.message === 'incorrect email') {
              alert('Unrecognized Email')
            }

          }
          else {
            //go to new component
            console.log("hello")
            this.authService.setIsLoggedIn(true);
            this.router.navigateByUrl('admin')
            var firstname:string = data.firstname
            var lastname:string = data.lastname
            var fullname:string = firstname.concat(" "+ lastname)
            this.accService.setLoginName(fullname)
          }
          console.log(data)
        })
      
  }
  createAccountClick() : void {
    this.router.navigateByUrl('signup')
  }

  ngOnInit(): void {
  }

}
