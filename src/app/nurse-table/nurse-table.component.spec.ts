import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseTableComponent } from './nurse-table.component';

describe('NurseTableComponent', () => {
  let component: NurseTableComponent;
  let fixture: ComponentFixture<NurseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
