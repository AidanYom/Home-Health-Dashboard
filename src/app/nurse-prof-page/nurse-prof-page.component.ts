import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nurse-prof-page',
  templateUrl: './nurse-prof-page.component.html',
  styleUrls: ['./nurse-prof-page.component.css']
})
export class NurseProfPageComponent implements OnInit {
  state$: any;
  

  constructor(public activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    console.log(history.state)
    
  }

}
