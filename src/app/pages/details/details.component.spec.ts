import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';
import { DetailsComponent } from './details.component';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormatIdPipe } from 'src/app/pipes/format-id/format-id.pipe';
import { BaseService } from 'src/app/services/base/base.service';
import {
  asyncData,
  defaultServerErrorMock,
  specieMock,
} from 'src/app/helpers/testHelpers';
import { Pokemon } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let pokemonsService: PokemonsService;
  let httpController: HttpTestingController;
  let baseService: BaseService;
  let activatedRoute: ActivatedRoute;

  let pokemonsServiceMock: Partial<PokemonsService> = {
    showMessage: () => {},
    getPokemon: () => {
      return new BehaviorSubject<any>(data);
    },
  };

  let data = {
    id: 1,
    height: 10,
    weight: 10,
    name: 'Testing data',
    stats: [{ base_stat: 1, stat: { name: 'Testing data' } }],
    types: [{ type: { name: 'Testing data', url: '' }, slot: 0 }],
    sprites: {
      other: { 'official-artwork': { front_default: 'Testing data' } },
    },
    abilities: undefined,
    species: { url: 'https://pokeapi.co/api/v2/pokemon-species/3' },
  };

  let data2: Pokemon = {
    id: 1,
    height: 10,
    weight: 10,
    name: 'Testing data',
    stats: [{ base_stat: 1, name: 'Testing data' }],
    types: [{ type: { name: 'Testing data', url: '' }, slot: 0 }],
    sprites: {
      other: { 'official-artwork': { front_default: 'Testing data' } },
    },
    abilities: undefined,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        CommonModule,
      ],
      declarations: [DetailsComponent, FormatIdPipe],
      providers: [
        { provide: PokemonsService, useValue: pokemonsServiceMock },
        BaseService,
      ],
    }).compileComponents();

    pokemonsService = TestBed.inject(PokemonsService);
    httpController = TestBed.inject(HttpTestingController);
    baseService = TestBed.inject(BaseService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing getPokemon() - (Using id)', () => {
    spyOn(pokemonsService, 'getPokemon').and.callThrough();
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.callFake(
      (string: string) => {
        if (string == 'name') {
          return '1';
        }
        return undefined;
      }
    );
    component.getPokemon();
  });

  it('Testing getPokemon() - (Using name)', () => {
    spyOn(pokemonsService, 'getPokemon').and.callThrough();
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.callFake(
      (string: string) => {
        if (string == 'name') {
          return '1';
        }
        return undefined;
      }
    );
    component.getPokemon();
  });

  it('Testing getPokemon() - (Empty Species)', () => {
    spyOn(pokemonsService, 'getPokemon')
      .and.callThrough()
      .and.returnValue(asyncData(data2));
    component.getPokemon();
  });

  it('Testing getPokemon() - (Without varieties)', () => {
    component.varietie = 'Testing';
    fixture.detectChanges();

    spyOn(pokemonsService, 'getPokemon')
      .and.callThrough()
      .and.returnValue(asyncData(data2));

    component.getPokemon();
  });

  it('Testing getPokemon() - (Exception)', () => {
    spyOn(pokemonsService, 'getPokemon')
      .and.callThrough()
      .and.returnValue(throwError({ status: 500 }));

    component.getPokemon();
  });

  it('Testing getEpecie()', fakeAsync(() => {
    const req = httpController.expectOne(
      'https://pokeapi.co/api/v2/pokemon-species/3'
    );
    req.flush(specieMock);

    component.getSpecie('https://pokeapi.co/api/v2/pokemon-species/3');
  }));

  it('Testing getEpecie() - (Exception)', fakeAsync(() => {
    const req = httpController.expectOne(
      'https://pokeapi.co/api/v2/pokemon-species/3'
    );
    req.flush(defaultServerErrorMock, defaultServerErrorMock);

    component.getSpecie('https://pokeapi.co/api/v2/pokemon-species/3');
  }));
});
