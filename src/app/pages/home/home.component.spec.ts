import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import {
  apiPokemonsResponseMock,
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
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
      ],
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

  it('Testing getPokemons()', () => {
    spyOn(baseService, 'get').and.returnValue(of(pokemonMock));

    component.getPokemons();
  });

  it('Testing getPokemons() - (Subscribe expection)', () => {
    spyOn(pokemonsService, 'getPokemons')
      .and.callThrough()
      .and.returnValue(throwError(defaultServerErrorMock));

    component.getPokemons();
  });

  it('Testing loadPokemons()', () => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.returnValue(of(apiPokemonsResponseMock));

    component.loadPage();
  });

  it('Testing loadPokemons() - (Exception)', () => {
    spyOn(baseService, 'get')
      .and.callThrough()
      .and.returnValue(throwError(defaultServerErrorMock));

    component.loadPage();
  });

  it('Testing search with query', fakeAsync(() => {
    spyOn(baseService, 'get').and.returnValue(of(pokemonMock));
    component.search.patchValue('test');
    tick(200);
  }));

  it('Testing search without query', fakeAsync(() => {
    spyOn(pokemonsService, 'getPokemons').and.returnValue(of({results: []}));
    component.search.patchValue('');
    tick(200);
  }));
});
