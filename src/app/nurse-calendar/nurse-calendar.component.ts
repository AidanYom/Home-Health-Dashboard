import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';
import { CalendarService } from '../services/calendar.service';

import {NgbModal, ModalDismissReasons, NgbTimepicker, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nurse-calendar',
  templateUrl: './nurse-calendar.component.html',
  styleUrls: ['./nurse-calendar.component.css']
})
export class NurseCalendarComponent implements OnInit {
  full_name: any;
  org = "IU Health Laffayette";

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  closeResult = '';
  modalRef:any;
  events: CalendarEvent[] = [
    
    
  ]
  
  start:any;
  end:any;
  constructor(public activatedRoute: ActivatedRoute, private router: Router, private calendarService: CalendarService) { 
    this.full_name = (this.router.getCurrentNavigation()!.extras.state);
    console.log(this.full_name);
  }

  ngOnInit(): void {
    this.calendarService.getCalendarEvents(this.org)
    .subscribe(data => {
      //console.log(data);

      const temp = (JSON.stringify(data))
        
      const data_json = JSON.parse(temp);
      console.log(data_json.data);

      for (let i = 0; i < data_json.data.length; i++) {
        if (data_json.data[i].nurse_name === this.full_name) {
          const timestamp_start = Date.parse(data_json.data[i].time_start);
          const dateObject_start = new Date(timestamp_start);

          const timestamp_end = Date.parse(data_json.data[i].time_end);
          const dateObject_end = new Date(timestamp_end);

          

          let date_event: CalendarEvent = {
            start: (dateObject_start),
            title: data_json.data[i].title,
            end: (dateObject_end)
          }
          
          this.events = [
            ...this.events,
            date_event
          ]
        }
      }

    });
  }

}
