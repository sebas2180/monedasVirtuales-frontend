import { TestBed } from '@angular/core/testing';

import { ManejoFechasServiceService } from './manejo-fechas-service.service';

describe('ManejoFechasServiceService', () => {
  let service: ManejoFechasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoFechasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
