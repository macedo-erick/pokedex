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
import { Type } from 'src/app/models/models';

import { TypesService } from './types.service';

describe('TypesService', () => {
  let service: TypesService;
  let httpController: HttpTestingController;
  let snackBar: MatSnackBar;

  let typeMock = { name: 'grass', url: 'https://pokeapi.co/api/v2/type/grass' };
  let defaultMessage = 'Test Message';

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

  it('Test showMessage', () => {
    let showMessageSpy = spyOn(snackBar, 'open');

    service.showMessage(defaultMessage);
    expect(showMessageSpy).toHaveBeenCalled();

    service.showMessage(defaultMessage, false);
    expect(showMessageSpy).toHaveBeenCalled();

    service.showMessage(defaultMessage, true);
    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Test errorHandler with message', () => {
    let showMessageSpy = spyOn(snackBar, 'open');
    service.errorHandler(new Error(defaultMessage));

    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Test errorHandler without message', () => {
    let showMessageSpy = spyOn(snackBar, 'open');

    service.errorHandler(new Error());

    expect(showMessageSpy).toHaveBeenCalled();
  });

  it('Test getType', fakeAsync(() => {
    let type: Type;

    service.getType(typeMock.name).subscribe((result) => {
      type = result;
    });

    tick();

    const req = httpController.expectOne(
      `${service.BASE_URL}/${typeMock.name}`
    );
    req.flush(typeMock);

    expect(req.request.method).toBe('GET');
    expect(type).toEqual(typeMock);
  }));

  it('Test getType (Exception)', fakeAsync(() => {
    let type: Type;

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
