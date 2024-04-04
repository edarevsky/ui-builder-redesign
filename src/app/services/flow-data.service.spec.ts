import { TestBed } from '@angular/core/testing';

import { FlowDataService } from './flow-data.service';

describe('FlowDataService', () => {
  let service: FlowDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
