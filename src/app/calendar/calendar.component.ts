import { Component, OnInit } from '@angular/core';

import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';

import { NgbModal, ModalDismissReasons, NgbTimepicker, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

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
  modalRef: any;
  nurses: Nurse[] = [];
  start: any;
  startDate: any;
  end: any;

  time_start: any;
  time_end: any;

  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
  patient_names: string[] = [];
  patient: string = '';
  title: string = '';
  reccuring: string = ''

  org = 1;

  nurse: string = '';



  events: CalendarEvent[] = [


  ]
  constructor(private calendarService: CalendarService, private modalService: NgbModal, private getNurseService: GetNurseService, private patientService: PatientService) { }

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
        }
      })

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
              id: data_json.data[i].event_id,
              start: (new_date_start),
              title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end) + "\n" + "Nurse: " +
              data_json.data[i].nurse_name + "\n" + "Patient: " +
              data_json.data[i].patient_name,
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
                id: data_json.data[i].event_id,
                start: (new_date_start),
                title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end) + "\n" + "Nurse: " +
              data_json.data[i].nurse_name + "\n" + "Patient: " +
              data_json.data[i].patient_name,
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
                id: data_json.data[i].event_id,
                start: (new_date_start),
                title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end) + "\n" + "Nurse: " +
              data_json.data[i].nurse_name + "\n" + "Patient: " +
              data_json.data[i].patient_name,
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
                id: data_json.data[i].event_id,
                start: (new_date_start),
                title: data_json.data[i].title + "\n" + this.getTime(data_json.data[i].time_start, data_json.data[i].time_end) + "\n" + "Nurse: " +
              data_json.data[i].nurse_name + "\n" + "Patient: " +
              data_json.data[i].patient_name,
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


      });



    this.patientService.getPatients(this.org)
      .subscribe(data => {


        const temp = (JSON.stringify(data))

        const data_json = JSON.parse(temp);
        //console.log(data_json.data)



        for (let i = 0; i < data_json.data.length; i++) {
          const full_name = data_json.data[i].firstName + ' ' + data_json.data[i].lastName;
          this.patient_names.unshift(full_name);


        }




      })


  }

  open(content: any) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  saveChanges() {

    this.title = this.title;
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
    const id = this.makeid(5);
    let date_event: CalendarEvent = {
      id: id,
      start: (dateObject_start),
      title: this.title,
      end: (dateObject_end),
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

    }
    //console.log(dateObject_start, dateObject_end)
    //this.events.push(date_event);
    //this.events.pop();
    //console.log(date_event);
    //console.log(this.events);

    // this.events = [
    //   ...this.events,
    //   date_event
    // ]

    if (this.reccuring === 'DoesNotRepeat' || this.reccuring === "") {

      let new_date_start = new Date(dateObject_start)

      let new_date_end = new Date(dateObject_end)
      let date_event: CalendarEvent = {
        id: id,
        start: (new_date_start),
        title: this.title + "\n" + this.getTime(date_time_start, date_time_end),
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
    //this.reccuring = 'Weekly'
    console.log(this.reccuring);
    if (this.reccuring === 'Weekly') {

      for (let j = 0; j <= 52; j++) {
        let new_date_start = new Date(dateObject_start)
        new_date_start.setDate(new_date_start.getDate() + (7 * j));

        let new_date_end = new Date(dateObject_end)
        new_date_end.setDate(new_date_end.getDate() + (7 * j));

        let date_event: CalendarEvent = {
          id: id,
          start: (new_date_start),
          title: this.title + "\n" + this.getTime(date_time_start, date_time_end),
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
    if (this.reccuring === 'Bi-Weekly') {
      for (let j = 0; j <= 26; j++) {
        let new_date_start = new Date(dateObject_start)
        new_date_start.setDate(new_date_start.getDate() + (14 * j));

        let new_date_end = new Date(dateObject_end)
        new_date_end.setDate(new_date_end.getDate() + (14 * j));

        let date_event: CalendarEvent = {
          id: id,
          start: (new_date_start),
          title: this.title + "\n" + this.getTime(date_time_start, date_time_end),
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
    if (this.reccuring === 'Daily') {
      for (let j = 0; j <= 365; j++) {
        let new_date_start = new Date(dateObject_start)
        new_date_start.setDate(new_date_start.getDate() + (1 * j));

        let new_date_end = new Date(dateObject_end)
        new_date_end.setDate(new_date_end.getDate() + (1 * j));

        let date_event: CalendarEvent = {
          id: id,
          start: (new_date_start),
          title: this.title + "\n" + this.getTime(date_time_start, date_time_end),
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
    // let eventTitleSplit = date_event.title.split(" ");
    // for (let i = 0; i < 3; i++) {
    //   eventTitleSplit.pop();
    // }
    // let eventTitle = eventTitleSplit.join(" ");


    // date_event.title = eventTitle + id;
    this.calendarService.addEvent(date_event.id ,date_event.title, date_time_start, date_time_end, this.reccuring, this.nurse, this.patient, this.org)
      .subscribe(data => {
        console.log(data);
      });



  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  deleteEvent(event: CalendarEvent) {
    console.log("inDeleteEvent")
    console.log(event.title);
    this.calendarService.deleteEvent(event.id)
      .subscribe(data => {
        //console.log(data);
      });
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
