import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';
import { DetailsComponent } from './details.component';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormatIdPipe } from 'src/app/pipes/format-id/format-id.pipe';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let pokemonsService: PokemonsService;
  let httpController: HttpTestingController;

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
    name: 'Test data',
    stats: [{ base_stat: 1, stat: { name: 'Test data' } }],
    types: [{ type: { name: 'Test data', url: '' }, slot: 0 }],
    sprites: {
      other: { 'official-artwork': { front_default: 'Test data' } },
    },
    abilities: undefined,
    species: {url: 'https://pokeapi.co/api/v2/pokemon-species/3'}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        CommonModule
      ],
      declarations: [DetailsComponent, FormatIdPipe],
      providers: [
        { provide: PokemonsService, useValue: pokemonsServiceMock },
      ],
    }).compileComponents();

    pokemonsService = TestBed.inject(PokemonsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test getPokemon', () => {
    spyOn(pokemonsService, 'getPokemon').and.callThrough();
    component.getPokemon();
  });

  it('Test getPokemon (Exception)', () => {
    spyOn(pokemonsService, 'getPokemon')
      .and.callThrough()
      .and.returnValue(throwError({ status: 500 }));

    component.getPokemon();
  });
});
