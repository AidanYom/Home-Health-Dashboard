import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTableComponent } from './landing-page-table.component';

describe('LandingPageTableComponent', () => {
  let component: LandingPageTableComponent;
  let fixture: ComponentFixture<LandingPageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
