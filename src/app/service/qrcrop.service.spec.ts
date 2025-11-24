import { TestBed } from '@angular/core/testing';

import { QrcropService } from './qrcrop.service';

describe('QrcropService', () => {
  let service: QrcropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrcropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
