import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { GetNurseService } from '../services/get-nurse.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { CalendarService } from '../services/calendar.service';

export interface Nurse {

  'Full Name': string;
  'Expertise': string;
  'no_of_patients_today': number;
  'Phone': string;
  'id': number;
  'Email': any
}

@Component({
  selector: 'app-nurse-table',
  templateUrl: './nurse-table.component.html',
  styleUrls: ['./nurse-table.component.css']
})
export class NurseTableComponent implements OnInit {

  //future get org from admin log in
  org = 1;
  events : CalendarEvent[] = [];
  allNurses = new Map();
  constructor(private getNurseService: GetNurseService, private _liveAnnouncer: LiveAnnouncer, private router: Router, private calendarService : CalendarService) { }

  displayedColumns: string[] = ['Full Name', 'no_of_patients_today', 'Expertise', 'Phone'];

  dataSource = new MatTableDataSource<Nurse>([]);

  clickedRows = new Set<Nurse>();


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    //this.dataSource = NURSE_DATA;
    const NURSE_DATA: Nurse[] = []
    console.log("yo");

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

        this.allNurses.set(row['Full Name'], 0);
      }

    });


    this.calendarService.getCalendarEvents(this.org)
    .subscribe(data => {
      //console.log(data);

      const temp = (JSON.stringify(data))

      const data_json = JSON.parse(temp);
      console.log(data_json.data);

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
                  console.log('Event deleted', event);
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
                    console.log('Event deleted', event);
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
                    console.log('Event deleted', event);
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
                    console.log('Event deleted', event);
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
      console.log(this.events);
      let today = new Date();

      for (let i = 0; i < this.events.length; i++) {
        if (today.getDate() == this.events[i].start.getDate() && today.getMonth() == this.events[i].start.getMonth() && today.getFullYear() == this.events[i].start.getFullYear()) {

          this.allNurses.set(this.events[i].id, this.allNurses.get(this.events[i].id) + 1);
        }
      }
      console.log(this.allNurses);



    });


    console.log(NURSE_DATA);

    this.getNurseService.getNurses(this.org)
    .subscribe(data => {

      for (let i = 0; i < data.data.length; i++) {
        const row: Nurse = {
          'Full Name': data.data[i].firstName + ' ' + data.data[i].lastName,
          'no_of_patients_today': this.allNurses.get(data.data[i].firstName + ' ' + data.data[i].lastName),
          'Expertise': data.data[i].skillDescription,
          'Phone': data.data[i].phone,
          'Email': data.data[i].email,
          'id': data.data[i].n_Nurse_Id
        }

        NURSE_DATA.unshift(row);


      }
      this.dataSource = new MatTableDataSource<Nurse>(NURSE_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });


  }

  onRowClick(row: any) {
    //console.log(row)
    this.router.navigateByUrl("/profpage", { state: row })
  }

  nurseSearch(event: Event) {
    const search = (event.target as HTMLInputElement).value;

    this.dataSource.filter = search.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

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
    console.log("inDeleteEvent")
    console.log(event.title);
    this.calendarService.deleteEvent(event.id)
      .subscribe(data => {
        //console.log(data);
      });
  }

  


}
