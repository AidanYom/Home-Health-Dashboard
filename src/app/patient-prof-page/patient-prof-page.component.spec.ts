import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfPageComponent } from './patient-prof-page.component';

describe('PatientProfPageComponent', () => {
  let component: PatientProfPageComponent;
  let fixture: ComponentFixture<PatientProfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
