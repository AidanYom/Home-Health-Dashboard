import { Component, OnInit } from '@angular/core';

import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';

import {NgbModal, ModalDismissReasons, NgbTimepicker, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

import { GetNurseService } from '../services/get-nurse.service';
import { PatientService } from '../services/patient.service';
import { CalendarService } from '../services/calendar.service';
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
  startDate:any;
  end:any;

  time_start:any;
  time_end:any;

  displayMonths = 1;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';
  patient_names: string[] = [];
  patient:string ='';
  title:string = '';
  reccuring:string = ''

  org = 1;

  nurse: string = '';

  

  events: CalendarEvent[] = [
    
    
  ]
  constructor(private calendarService: CalendarService, private modalService: NgbModal, private getNurseService: GetNurseService, private patientService: PatientService) { }

  ngOnInit(): void {
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

    });

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

    this.patientService.getPatients(this.org)
    .subscribe(data => {
        

        const temp = (JSON.stringify(data))
        
        const data_json = JSON.parse(temp);
        //console.log(data_json.data)

 

        for (let i = 0; i < data_json.data.length; i++) {
          const full_name = data_json.data[i].firstName + ' ' + data_json.data[i].lastName;
          this.patient_names.unshift(full_name);
          //console.log(full_name);

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

    const start = (this.startDate.getMonth() + 1) + '/' + this.startDate.getDate() + '/' + this.startDate.getFullYear();


    const time_start_string = `${this.time_start["hour"]}:${this.time_start["minute"]}:${this.time_start["second"]}`;
    const time_end_string = `${this.time_end["hour"]}:${this.time_end["minute"]}:${this.time_end["second"]}`;

    console.log(start);

    const date_time_start = start + ' ' + time_start_string;
    const date_time_end = start + ' ' + time_end_string;

    const timestamp_start = Date.parse(date_time_start);
    const dateObject_start = new Date(timestamp_start);

    const timestamp_end = Date.parse(date_time_end);
    const dateObject_end = new Date(timestamp_end);

    // console.log(date_time_start, date_time_end);

    let date_event: CalendarEvent = {
      start: (dateObject_start),
      title: this.title,
      end: (dateObject_end)
    }
    //console.log(dateObject_start, dateObject_end)
    //this.events.push(date_event);
    //this.events.pop();
    //console.log(date_event);
    //console.log(this.events);

    this.events = [
      ...this.events,
      date_event
    ]

    this.calendarService.addEvent(date_event.title, date_time_start, date_time_end, this.reccuring, this.nurse, this.patient, this.org)
    .subscribe(data => {
      //console.log(data);
    });

    
    
  }


  

}
