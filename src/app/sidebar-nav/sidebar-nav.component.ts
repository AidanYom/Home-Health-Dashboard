import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  isopened:boolean = false;
  is_logged_in: boolean = false;

  constructor(private router: Router, private authService: AuthServiceService) { 
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.checkRoute();
      }
    })
  }

  ngOnInit(): void {
  }

  checkRoute(): void {
    this.is_logged_in = this.authService.getIsLoggedIn();
    if((this.router.url === '/' || this.router.url === '/login' || this.router.url === '/forgetPassword' || this.router.url === '/signup' ||this.router.url === '/reset-password')) {
      this.isopened = false;
    } else if(this.is_logged_in) {
      this.isopened = true;
    } else {
      this.router.navigateByUrl('/');
    }
  }

  logout(): void {
    this.authService.setIsLoggedIn(false);
  }
}
