import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import {
  apiPokemonsResponseMock,
  asyncData,
  asyncError,
  defaultServerErrorMock,
  pokemonMock,
  pokemonsServiceMock,
} from 'src/app/helpers/testHelpers';
import { BaseService } from 'src/app/services/base/base.service';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let pokemonsService: PokemonsService;
  let baseService: BaseService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [HomeComponent],
      providers: [
        { provide: PokemonsService, useValue: pokemonsServiceMock },
        BaseService,
      ],
    }).compileComponents();

    pokemonsService = TestBed.inject(PokemonsService);
    baseService = TestBed.inject(BaseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing getPokemons()', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.callThrough();
    spyOn(baseService, 'get').and.resolveTo(asyncData(pokemonMock));

    flush();

    component.getPokemons();
  }));

  it('Testing getPokemons() - (Subscribe expection)', () => {
    spyOn(pokemonsService, 'getPokemons')
      .and.callThrough()
      .and.returnValue(throwError(defaultServerErrorMock));

    component.getPokemons();
  });

  it('Testing getPokemons() - (Expection)', fakeAsync(() => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.rejectWith(asyncError(defaultServerErrorMock));

    component.getPokemons();
  }));

  it('Testing loadPokemons()', fakeAsync(() => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.resolveTo(apiPokemonsResponseMock);

    component.loadPokemons();
  }));

  it('Testing loadPokemons() - (Exception)', fakeAsync(() => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.rejectWith(asyncError(defaultServerErrorMock));

    component.loadPokemons();
  }));

  it('Testing promisesHandler() - (Exception)', fakeAsync(() => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.rejectWith(asyncError(defaultServerErrorMock));

    component.promisesHandler(apiPokemonsResponseMock);
  }));

  it('Testing search with query', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.callThrough();
    spyOn(baseService, 'get').and.resolveTo(asyncData(pokemonMock));
    flush();
    component.search('T');
  }));

  it('Testing search with query (Exception)', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.callThrough();
    spyOn(baseService, 'get').and.rejectWith(
      asyncError(defaultServerErrorMock)
    );
    flush();
    component.search('T');
  }));

  it('Testing search no query', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.callThrough();
    spyOn(baseService, 'get').and.resolveTo(asyncData(pokemonMock));
    flush();
    component.search('');
  }));
});
