import { TestBed } from '@angular/core/testing';

import { SubreaditService } from './subreadit.service';

describe('SubreaditService', () => {
  let service: SubreaditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubreaditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
