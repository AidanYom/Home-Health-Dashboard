import { Component, NgModule, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { Nurse } from '../landing-page-table/landing-page-table.component';
import { AccountActivityService } from '../services/account-activity.service';
import { GetNurseService } from '../services/get-nurse.service';
import { CalendarService } from '../services/calendar.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})




export class AdminHomepageComponent implements OnInit {
  org: number = 1;
  nurses: Nurse[] = [];
  nurseLength: number = 0;
  uniqueNursesToday: number = 0;
  numEventsToday: number = 0;
  eventsFinished: number = 0;
  events: CalendarEvent[] = []
  todayEvents: CalendarEvent[] = [];
  allNurses = new Map();



  constructor(private router: Router, private accService: AccountActivityService, private getNurseService: GetNurseService, private calendarService : CalendarService) { }

  ngOnInit(): void {
    this.getNurseService.getNurses(this.org)
    .subscribe(data => {

      for (let i = 0; i < data.data.length; i++) {
        const row: Nurse = {
          'Full Name': data.data[i].firstName + ' ' + data.data[i].lastName,
          'no_of_patients_today': 4,
          'Expertise': data.data[i].skillDescription,
          'Phone': data.data[i].phone,
          'Email': data.data[i].email,
          'id': data.data[i].n_Nurse_Id
        }

        this.nurses.unshift(row);
        // console.log(row)
        // console.log(this.nurses)
        this.allNurses.set(row['Full Name'], 0);
      }
      this.nurseLength = this.nurses.length;
    });

    this.calendarService.getCalendarEvents(this.org)
    .subscribe(data => {
      // console.log(data);

      const temp = (JSON.stringify(data))

      const data_json = JSON.parse(temp);
      // console.log(data_json.data);

      for (let i = 0; i < data_json.data.length; i++) {
        const timestamp_start = Date.parse(data_json.data[i].time_start);
        const dateObject_start = new Date(timestamp_start);

        const timestamp_end = Date.parse(data_json.data[i].time_end);
        const dateObject_end = new Date(timestamp_end);

        if (data_json.data[i].recurring === 'DoesNotRepeat' || data_json.data[i].recurring === '') {
          
          let new_date_start = new Date(dateObject_start)

          let new_date_end = new Date(dateObject_end)
          let date_event: CalendarEvent = {
            id: data_json.data[i].nurse_name,
            start: (new_date_start),
            title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end),
            actions: [
              {
                label: '<i class="fa fa-trash" aria-hidden="true"></i>',

                onClick: ({ event }: { event: CalendarEvent }): void => {
                  this.events = this.events.filter((iEvent) => iEvent !== event);
                  // console.log('Event deleted', event);
                  this.deleteEvent(event);
                }
              },
            ],
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
            const splitTitle = data_json.data[i].title.split(" ");
            splitTitle.pop();
            const eventTitle = splitTitle.join(" ");

            let date_event: CalendarEvent = {
              id: data_json.data[i].nurse_name,
              start: (new_date_start),
              title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end),
              actions: [
                {
                  label: '<i class="fa fa-trash" aria-hidden="true"></i>',

                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.events = this.events.filter((iEvent) => iEvent !== event);
                    // console.log('Event deleted', event);
                    this.deleteEvent(event);
                  }
                },
              ],
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
            const splitTitle = data_json.data[i].title.split(" ");
            splitTitle.pop();
            const eventTitle = splitTitle.join(" ");

            let date_event: CalendarEvent = {
              id: data_json.data[i].nurse_name,
              start: (new_date_start),
              title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end),
              end: (new_date_end),
              actions: [
                {
                  label: '<i class="fa fa-trash" aria-hidden="true"></i>',
                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.events = this.events.filter((iEvent) => iEvent !== event);
                    // console.log('Event deleted', event);
                    this.deleteEvent(event);
                  },
                },
              ],
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
          const splitTitle = data_json.data[i].title.split(" ");
          splitTitle.pop();
          const eventTitle = splitTitle.join(" ");
          for (let j = 0; j <= 365; j++) {
            let new_date_start = new Date(dateObject_start)
            new_date_start.setDate(new_date_start.getDate() + j);

            let new_date_end = new Date(dateObject_end)
            new_date_end.setDate(new_date_end.getDate() + j);

            let date_event: CalendarEvent = {
              id: data_json.data[i].nurse_name,
              start: (new_date_start),
              title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end),
              end: (new_date_end),
              actions: [
                {
                  label: '<i class="fa fa-trash" aria-hidden="true"></i>',
                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.events = this.events.filter((iEvent) => iEvent !== event);
                    // console.log('Event deleted', event);
                    this.deleteEvent(event);
                  },
                },
              ],
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
      // console.log(this.events);
      let today = new Date();

      for (let i = 0; i < this.events.length; i++) {
        if (today.getDate() == this.events[i].start.getDate() && today.getMonth() == this.events[i].start.getMonth() && today.getFullYear() == this.events[i].start.getFullYear()) {
          this.todayEvents.unshift(this.events[i]);
          this.allNurses.set(this.events[i].id, this.allNurses.get(this.events[i].id) + 1);
          this.numEventsToday++;
        }
      }
      // console.log(this.allNurses);
      this.allNurses.forEach((value, key) => {
        if (value != 0) {
          this.uniqueNursesToday++;
        }
      });
      // console.log(this.todayEvents);
      if(this.todayEvents != undefined) {
        for (let i = 0; i < this.todayEvents.length; i++) {
          let todayEnd = this.todayEvents[i].end?.getTime() || 0;
          if (todayEnd != 0 && todayEnd < today.getTime()) {
            this.eventsFinished++;
          }
        }
      }



    });


    

  }

  navigateToAddNurse() {
    this.router.navigateByUrl('add-nurse');
  }
  navigateToAddPatient() {
    this.router.navigateByUrl('add-patient');
  }
  navigateToCalendar() {
    this.router.navigateByUrl('calendar');
  }
  getOrgName() {
    if(this.accService.getOrgName()){
      return this.accService.getOrgName();
    }
    return "";
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

  deleteEvent(event: CalendarEvent) {
    // console.log("inDeleteEvent")
    // console.log(event.title);
    this.calendarService.deleteEvent(event.id)
      .subscribe(data => {
        // console.log(data);
      });
  }

}
