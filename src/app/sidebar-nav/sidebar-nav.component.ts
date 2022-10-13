import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  isopened:boolean = false;

  constructor(private router: Router) { 
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.checkRoute();
      }
    })
  }

  ngOnInit(): void {
  }

  checkRoute(): void {
    if((this.router.url === '/' || this.router.url === '/login' || this.router.url === '/forgetPassword' || this.router.url === '/signup')) {
      this.isopened = false;
    } else {
      this.isopened = true;
    }
  }

}
