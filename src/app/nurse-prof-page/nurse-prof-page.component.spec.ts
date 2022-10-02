import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseProfPageComponent } from './nurse-prof-page.component';

describe('NurseProfPageComponent', () => {
  let component: NurseProfPageComponent;
  let fixture: ComponentFixture<NurseProfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseProfPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseProfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
