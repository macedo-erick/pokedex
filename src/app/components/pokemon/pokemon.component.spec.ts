import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  pokemonMock,
  pokemonsServiceMock,
} from 'src/app/helpers/testHelpers';
import { Pokemon, PokemonDTO, Type } from 'src/app/models/models';
import { FormatIdPipe } from 'src/app/pipes/format-id/format-id.pipe';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';

import { PokemonComponent } from './pokemon.component';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let pockemonDTOMock: Partial<PokemonDTO> = {
    convertType: () => new Type(),
    convertResponseToPokemonCard: () => pokemonMock
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule],
      declarations: [PokemonComponent, FormatIdPipe],
      providers: [
        { provide: PokemonsService, useValue: pokemonsServiceMock },
        { provide: PokemonDTO, useValue: pockemonDTOMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
