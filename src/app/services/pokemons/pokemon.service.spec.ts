import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  apiPokemonsResponseMock,
  defaultErrorMessageMock,
  defaultServerErrorMock,
  snackBarServiceMock,
} from 'src/app/helpers/testHelpers';
import {
  apiPokemonResponse,
  Pokemon,
} from 'src/app/models/models';

import { PokemonsService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonsService;
  let httpController: HttpTestingController;
  let snackBar: MatSnackBar;

  let defaultMessage = 'Test Message';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBarServiceMock },
        PokemonsService,
      ],
    });
    service = TestBed.inject(PokemonsService);
    snackBar = TestBed.inject(MatSnackBar);
    httpController = TestBed.inject(HttpTestingController);
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

  it('Test getPokemons', fakeAsync(() => {
    let pokemons: apiPokemonResponse[] = [];

    service.getPokemons().subscribe((response) => {
      pokemons = response.results;
    });

    tick();

    const req = httpController.expectOne(
      `${service.BASE_URL}/?offset=0&limit=40`
    );
    req.flush(apiPokemonsResponseMock);

    expect(req.request.method).toBe('GET');
    expect(pokemons).toEqual(apiPokemonsResponseMock.results);
  }));

  it('Test getPokemons (Exception)', fakeAsync(() => {
    let pokemons: apiPokemonResponse[];

    service.getPokemons().subscribe((response) => {
      pokemons = response.results;
    });

    tick();

    const req = httpController.expectOne(
      `${service.BASE_URL}/?offset=0&limit=40`
    );
    req.flush(defaultErrorMessageMock, {
      status: 500,
      statusText: 'Internal Server Error',
    });

    expect(req.request.method).toBe('GET');
    expect(pokemons).toBeUndefined();
  }));

  it('Test getPokemon', () => {
    let pokemon: Pokemon;

    service.getPokemon(1).subscribe((response) => {
      pokemon = response;
    });

    const req = httpController.expectOne(`${service.BASE_URL}/1`);
    req.flush(new Pokemon());

    expect(req.request.method).toBe('GET');
    expect(pokemon).toEqual(new Pokemon());
  });

  it('Test getPokemon (Exception)', () => {
    let pokemon: Pokemon;

    service.getPokemon(1).subscribe((response) => {
      pokemon = response;
    });

    const req = httpController.expectOne(`${service.BASE_URL}/1`);
    req.flush(defaultErrorMessageMock, defaultServerErrorMock);

    expect(req.request.method).toBe('GET');
    expect(pokemon).toBeUndefined();
  });
});
