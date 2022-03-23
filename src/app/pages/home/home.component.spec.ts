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
import { BehaviorSubject, throwError } from 'rxjs';
import {
  apiPokemonsResponseMock,
  asyncData,
  asyncError,
  defaultErrorMessageMock,
  defaultServerErrorMock,
  pokemonDtoMock,
  pokemonMock,
  pokemonsServiceMock,
} from 'src/app/helpers/testHelpers';
import { PokemonDTO } from 'src/app/models/models';
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
        { provide: PokemonDTO, useValue: pokemonDtoMock },
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

  it('Test getPokemons', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.callThrough();
    spyOn(baseService, 'get').and.resolveTo(asyncData(pokemonMock));

    flush();

    component.getPokemons();
  }));

  it('Test getPokemons (Subscribe expection)', () => {
    spyOn(pokemonsService, 'getPokemons')
      .and.callThrough()
      .and.returnValue(throwError(defaultServerErrorMock));

    component.getPokemons();
  });

  it('Test getPokemons (Expection)', fakeAsync(() => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.rejectWith(asyncError(defaultServerErrorMock));

    component.getPokemons();
  }));

  it('Test loadPokemons', fakeAsync(() => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.resolveTo(apiPokemonsResponseMock);

    component.loadPokemons();
  }));

  it('Test loadPokemons (Exception)', fakeAsync(() => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.rejectWith(asyncError(defaultServerErrorMock));

    component.loadPokemons();
  }));

  it('Test promisesHasndler (Exception)', fakeAsync(() => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.rejectWith(asyncError(defaultServerErrorMock));

    component.promisesHandler(apiPokemonsResponseMock);
  }));

  it('Test search with query', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.callThrough();
    spyOn(baseService, 'get').and.resolveTo(asyncData(pokemonMock));
    flush();
    component.search('T');
  }));

  it('Test search with query (Exception)', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.callThrough();
    spyOn(baseService, 'get').and.rejectWith(asyncError(defaultServerErrorMock));
    flush();
    component.search('T');
  }));

  it('Test search no query', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.callThrough();
    spyOn(baseService, 'get').and.resolveTo(asyncData(pokemonMock));
    flush();
    component.search('');
  }));
});
