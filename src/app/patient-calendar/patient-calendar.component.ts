import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';
import { CalendarService } from '../services/calendar.service';
import { CalendarComponent } from '../calendar/calendar.component';

import {NgbModal, ModalDismissReasons, NgbTimepicker, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-patient-calendar',
  templateUrl: './patient-calendar.component.html',
  styleUrls: ['./patient-calendar.component.css']
})
export class PatientCalendarComponent implements OnInit {

  full_name: any;
  org = 1;

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
    // console.log(this.full_name);
  }

  ngOnInit(): void {
    this.calendarService.getCalendarEvents(this.org)
    .subscribe(data => {
      //console.log(data);

      const temp = (JSON.stringify(data))
        
      const data_json = JSON.parse(temp);
      // console.log(data_json.data);

      for (let i = 0; i < data_json.data.length; i++) {
        if (data_json.data[i].patient_name === this.full_name) {
          const timestamp_start = Date.parse(data_json.data[i].time_start);
          const dateObject_start = new Date(timestamp_start);

          const timestamp_end = Date.parse(data_json.data[i].time_end);
          const dateObject_end = new Date(timestamp_end);

          

          let date_event: CalendarEvent = {
            start: (dateObject_start),
            title: data_json.data[i].title,
            end: (dateObject_end)
          }
          
          // this.events = [
          //   ...this.events,
          //   date_event
          // ]

          if (data_json.data[i].recurring === 'DoesNotRepeat') {

            let new_date_start = new Date(dateObject_start)

            let new_date_end = new Date(dateObject_end)
            let date_event: CalendarEvent = {
              start: (new_date_start),
              title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end),
              end: (new_date_end),
              color: {
                primary: '#008ee0',
                secondary: '#dcf9fa',
              }

            }

            this.events = [
              ...this.events,
              date_event
            ]

            
          }

          if (data_json.data[i].recurring === 'Weekly') {
            for (let j = 0; j <= 52; j++) { 
              let new_date_start = new Date(dateObject_start)
              new_date_start.setDate(new_date_start.getDate() + (7 * j));
  
              let new_date_end = new Date(dateObject_end)
              new_date_end.setDate(new_date_end.getDate() + (7 * j));
  
              let date_event: CalendarEvent = {
                start: (new_date_start),
                title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end),
                end: (new_date_end),
                color: {
                  primary: '#f20707',
                  secondary: '#f7cdcd',
                }
              }
  
              this.events = [
                ...this.events,
                date_event
              ]
  
  
              
          
          }
          }
  
        if (data_json.data[i].recurring === 'Bi-Weekly') {
          for (let j = 0; j <= 26; j++) { 
            let new_date_start = new Date(dateObject_start)
            new_date_start.setDate(new_date_start.getDate() + (14 * j));
  
            let new_date_end = new Date(dateObject_end)
            new_date_end.setDate(new_date_end.getDate() + (14 * j));
  
            let date_event: CalendarEvent = {
              start: (new_date_start),
              title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end),
              end: (new_date_end),
              color: {
                primary: '#f5b402',
                secondary: '#faf7be',
              }
            }
  
            this.events = [
              ...this.events,
              date_event
            ]
  
  
            
        
          }
  
  
          }
          if (data_json.data[i].recurring === 'Daily') {
            for (let j = 0; j <= 365; j++) { 
              let new_date_start = new Date(dateObject_start)
              new_date_start.setDate(new_date_start.getDate() + (1 * j));
    
              let new_date_end = new Date(dateObject_end)
              new_date_end.setDate(new_date_end.getDate() + (1 * j));
    
              let date_event: CalendarEvent = {
                start: (new_date_start),
                title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end),
                end: (new_date_end),
                color: {
                  primary: '#0ced1f',
                  secondary: '#dcfade',
                }
              }
              if (!(new_date_start.getDay() == 6 || new_date_start.getDay() == 0)) {
                this.events = [
                  ...this.events,
                  date_event
                ]
              }
              
    
    
              
          
            }
    
    
            }
        }
      }

    });
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  getTime(startTime: string, endTime: string) {
    const splitStringStart = startTime.split(" ");
    splitStringStart.shift();
    const startSplit = splitStringStart[0].split(":");
    let startHour = Number(startSplit[0]);
    let startMinute = startSplit[1];
    if (startMinute.length == 1) {
      startMinute = "0" + startMinute
    }
    let startFinal = "";
    if (startHour > 12) {
      startHour %= 12;
      startFinal = String(startHour) + ":" + startMinute + "pm"
    } else if (startHour == 0) {
      startHour += 12;
      startFinal = String(startHour) + ":" + startMinute + "am" 
    }
    else if (startHour == 12){
      startFinal = String(startHour) + ":" + startMinute + "pm"
    } else {
      startFinal = String(startHour) + ":" + startMinute + "am"
    }

    const splitStringEnd = endTime.split(" ");
    splitStringEnd.shift();
    const endSplit = splitStringEnd[0].split(":");
    let endHour = Number(endSplit[0]);
    let endFinal = "";
    let endMinute = endSplit[1];
    if (endMinute.length == 1) {
      endMinute = "0" + endMinute
    }
    if (endHour > 12) {
      endHour %= 12;
      endFinal = String(endHour) + ":" + endMinute + "pm"
    } else if (endHour == 0) {
      endHour += 12;
      endFinal = String(endHour) + ":" + endMinute + "am"
    } else if (endHour == 12){
      endFinal = String(endHour) + ":" + endMinute + "pm"
    }else {
      endFinal = String(endHour) + ":" + endMinute + "am"
    }


    return startFinal + " - " + endFinal;
  }
}
