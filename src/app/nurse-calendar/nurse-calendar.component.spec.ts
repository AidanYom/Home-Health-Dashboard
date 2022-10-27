import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCalendarComponent } from './nurse-calendar.component';

describe('NurseCalendarComponent', () => {
  let component: NurseCalendarComponent;
  let fixture: ComponentFixture<NurseCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
