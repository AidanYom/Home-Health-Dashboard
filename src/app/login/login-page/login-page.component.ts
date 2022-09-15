import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  @ViewChild('login') login! :ElementRef;
  constructor() { }

  onClick() : void {
      this.login.nativeElement.blur();
      
  }

  ngOnInit(): void {
  }

}
