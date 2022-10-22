import { Component, OnInit } from '@angular/core';

import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';

import {NgbModal, ModalDismissReasons, NgbTimepicker, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

import { GetNurseService } from '../services/get-nurse.service';
import { Nurse } from '../landing-page-table/landing-page-table.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  closeResult = '';
  modalRef:any;
  nurses : Nurse[] = [];
  start:any;
  end:any;

  time_start:any;
  time_end:any;

  displayMonths = 1;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';

  org = "IU Health Laffayette";

  nurse: string = '';

  

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'First event',
      end: endOfDay(new Date())
    },
    {
      start: startOfDay(new Date()),
      title: 'Second event',
    }
  ]
  constructor(private modalService: NgbModal, private getNurseService: GetNurseService) { }

  ngOnInit(): void {
    this.getNurseService.getNurses(this.org)
    .subscribe(data => {
      
      for (let i = 0; i < data.data.length; i++) {
        const row: Nurse = {
          'Full Name' : data.data[i].firstName + ' ' + data.data[i].lastName,
          'no_of_patients_today' : 4,
          'Expertise' : data.data[i].skillDescription,
          'Phone': data.data[i].phone,
          'Email': data.data[i].email,
          'id' : data.data[i].n_Nurse_Id
        }

        this.nurses.unshift(row);
      }
    })
  }

  open(content:any) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  saveChanges() {

    console.log(this.nurses)
    

    const start_string = `${this.start["month"]}/${this.start["day"]}/${this.start["year"]}`
    


    const time_start_string = `${this.time_start["hour"]}:${this.time_start["minute"]}:${this.time_start["second"]}`;
    const time_end_string = `${this.time_end["hour"]}:${this.time_end["minute"]}:${this.time_end["second"]}`;

    const date_time_start = start_string + ' ' + time_start_string;
    const date_time_end = start_string + ' ' + time_end_string;

    const timestamp_start = Date.parse(date_time_start);
    const dateObject_start = new Date(timestamp_start);

    const timestamp_end = Date.parse(date_time_end);
    const dateObject_end = new Date(timestamp_end);

    console.log(date_time_start, date_time_end);

    let date_event: CalendarEvent = {
      start: (dateObject_start),
      title: 'test',
      end: (dateObject_end)
    }
    console.log(dateObject_start, dateObject_end)
    //this.events.push(date_event);
    //this.events.pop();
    //console.log(date_event);
    //console.log(this.events);

    this.events = [
      ...this.events,
      date_event
    ]

    
    
  }


  

}
