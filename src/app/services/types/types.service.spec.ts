import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  defaultErrorMessageMock,
  defaultServerErrorMock,
} from 'src/app/helpers/testHelpers';
import { Types } from 'src/app/models/models';

import { TypesService } from './types.service';

describe('TypesService', () => {
  let service: TypesService;
  let httpController: HttpTestingController;
  let snackBar: MatSnackBar;

  let typeMock = { name: 'grass', url: 'https://pokeapi.co/api/v2/type/grass' };
  let defaultMessage = 'Testing Message';

  const matSnackBarMock = {
    open: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarMock },
        TypesService,
      ],
    });
    service = TestBed.inject(TypesService);
    httpController = TestBed.inject(HttpTestingController);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing showMessage()', () => {
    let showMessageSpy = spyOn(snackBar, 'open');

    service.showMessage(defaultMessage);
    expect(showMessageSpy).toHaveBeenCalled();

    service.showMessage(defaultMessage, false);
    expect(showMessageSpy).toHaveBeenCalled();

    service.showMessage(defaultMessage, true);
    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Testing errorHandler() with message', () => {
    let showMessageSpy = spyOn(snackBar, 'open');
    service.errorHandler(new Error(defaultMessage));

    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Testing errorHandler() without message', () => {
    let showMessageSpy = spyOn(snackBar, 'open');

    service.errorHandler(new Error());

    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Testing getType()', fakeAsync(() => {
    let type: Types;

    service.getType(typeMock.name).subscribe((result) => {
      type = result;
    });

    tick();

    const req = httpController.expectOne(
      `${service.BASE_URL}/${typeMock.name}`
    );
    req.flush(typeMock);

    expect(req.request.method).toBe('GET');
  }));

  it('Testing getType() - (Exception)', fakeAsync(() => {
    let type: Types;

    service.getType(typeMock.name).subscribe((result) => {
      type = result;
    });

    const req = httpController.expectOne(
      `${service.BASE_URL}/${typeMock.name}`
    );

    req.flush(defaultErrorMessageMock, defaultServerErrorMock);

    tick();

    expect(req.request.method).toBe('GET');
  }));
});
