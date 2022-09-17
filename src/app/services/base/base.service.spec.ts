import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  defaultErrorMessageMock,
  defaultServerErrorMock,
} from 'src/app/helpers/testHelpers';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;
  let httpController: HttpTestingController;
  const url = 'https://www.google.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseService],
    });
    service = TestBed.inject(BaseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing get()', () => {
    service.get(url).subscribe((res) => {
      return res;
    });

    const req = httpController.expectOne(url);
    req.flush('Sucess');

    expect(req.request.method).toBe('GET');
  });

  it('Testing get() - (Exception)', () => {
    service.get(url).subscribe(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    );

    const req = httpController.expectOne(url);
    req.flush(defaultErrorMessageMock, defaultServerErrorMock);

    expect(req.request.method).toBe('GET');
  });
});
