import { TestBed } from '@angular/core/testing';

import { GetNurseService } from './get-nurse.service';

describe('GetNurseService', () => {
  let service: GetNurseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetNurseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
