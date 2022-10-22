import { Component, OnInit } from '@angular/core';

import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  
  start:any;
  end:any;

  

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
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
    const timestamp_start = Date.parse(this.start);
    const dateObject_start = new Date(timestamp_start);

    const timestamp_end = Date.parse(this.end);
    const dateObject_end = new Date(timestamp_end);

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
