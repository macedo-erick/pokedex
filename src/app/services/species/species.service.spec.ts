import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  defaultErrorMessageMock,
  defaultServerErrorMock,
  snackBarServiceMock,
  specieMock,
} from 'src/app/helpers/testHelpers';
import { Specie } from 'src/app/models/models';

import { SpeciesService } from './species.service';

describe('SpeciesService', () => {
  let service: SpeciesService;
  let snackBar: MatSnackBar;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBarServiceMock },
        SpeciesService,
      ],
    });
    service = TestBed.inject(SpeciesService);
    snackBar = TestBed.inject(MatSnackBar);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing showMessage()', () => {
    let showMessageSpy = spyOn(snackBar, 'open');

    service.showMessage(defaultErrorMessageMock);
    expect(showMessageSpy).toHaveBeenCalled();

    service.showMessage(defaultErrorMessageMock, false);
    expect(showMessageSpy).toHaveBeenCalled();

    service.showMessage(defaultErrorMessageMock, true);
    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Testing errorHandler() with message', () => {
    let showMessageSpy = spyOn(snackBar, 'open');
    service.errorHandler(new Error(defaultErrorMessageMock));

    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Testing errorHandler() without message', () => {
    let showMessageSpy = spyOn(snackBar, 'open');

    service.errorHandler(new Error());

    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Testing getSpecie()', fakeAsync(() => {
    let specie: Specie = {};

    service.getSpecie(1).subscribe((result) => {
      specie = result;
    });

    const req = controller.expectOne(`${service.BASE_URL}/1`);
    req.flush(specieMock);

    expect(req.request.method).toBe('GET');
    expect(specie).toEqual(specieMock);
  }));

  it('Testing getSpecie() - (Exception)', fakeAsync(() => {
    let specie: Specie = {};

    service.getSpecie(1).subscribe((result) => {
      specie = result;
    });

    const req = controller.expectOne(`${service.BASE_URL}/1`);
    req.flush(defaultErrorMessageMock, defaultServerErrorMock);

    expect(req.request.method).toBe('GET');
  }));
});
