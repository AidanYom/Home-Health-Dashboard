import { TestBed } from '@angular/core/testing';

import { AccountActivityService } from './account-activity.service';

describe('AccountActivityService', () => {
  let service: AccountActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
