import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  @ViewChild('login') login! :ElementRef;
  constructor(private authService: AuthServiceService, private router: Router) { }
  email: string = '';
  password: string = '';
  shakeIt = false;
  incorrectPassword = false;
  onClick() : void {
      this.login.nativeElement.blur();
      
      console.log(this.email)
      console.log(this.password)

      this.authService.login(this.email, this.password)
        .subscribe(data => {
          if (data.status === '400') {
            //alert("Incorrect Credentials")
            this.incorrectPassword = true;
            this.shakeIt = true;
            setTimeout(() => {
              this.shakeIt = false;
            }, 300);
          }
          else {
            //go to new component
            console.log("hello")
            this.router.navigateByUrl('admin')
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
