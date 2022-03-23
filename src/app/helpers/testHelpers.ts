/* istanbul ignore file */

import { BehaviorSubject, defer } from 'rxjs';
import {
  Pokemon,
  PokemonDTO,
  Specie,
  SpecieDTO,
  Type,
  TypesDTO,
} from '../models/models';
import { PokemonsService } from '../services/pokemons/pokemon.service';
import { SpeciesService } from '../services/species/species.service';
import { TypesService } from '../services/types/types.service';

const typeMock = new Type();
typeMock.name = 'grass';
typeMock.weaknesses = ['ice'];
typeMock.resistences = ['ice'];

const specieMock = new Specie();
specieMock.id = 1;
specieMock.text = 'Test data';
specieMock.evolution_chain.url = 'https://pokeapi.co/api/v2/pokemon-species/1';

const pokemonMock = new Pokemon();
pokemonMock.id = 1;
pokemonMock.name = 'Test';
pokemonMock.height = 10;
pokemonMock.weight = 10;
pokemonMock.types = [
  {
    name: 'Test',
    slot: 1,
    url: '',
    resistences: ['ice'],
    weaknesses: ['ice'],
  },
];
pokemonMock.abilities = [
  { ability: { name: 'Test', url: '' }, is_hidden: false, slot: 1 },
];
pokemonMock.sprites = {
  front_bigger: '',
  other: { 'official-artwork': { front_default: 'Test data' } },
};
pokemonMock.stats = [
  { name: 'Test', value: 10 },
  { name: 'Test', value: 30 },
  { name: 'Test', value: 40 },
  { name: 'Test', value: 70 },
  { name: 'Test', value: 60 },
  { name: 'Test', value: 50 },
];

const evolutionChainMock = {
  chain: {
    species: {
      name: 'Test',
    },
    evolves_to: [
      {
        species: { name: 'Test 1' },
        evolves_to: [{ species: { name: 'Test 2' } }],
      },
    ],
  },
};

const apiPokemonResponseMock = {
  name: 'Test',
  url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1500',
};
const apiPokemonsResponseMock = { results: [apiPokemonResponseMock] };
const defaultErrorMessageMock = 'Something Went Wrong';
const defaultServerErrorMock = {
  status: 500,
  statusText: 'Internal Server Error',
};

const specieServiceMock: Partial<SpeciesService> = {
  showMessage: () => {},
  getSpecie: () => new BehaviorSubject<any>(specieMock),
};

const typeServiceMock: Partial<TypesService> = {
  showMessage: () => {},
  getType: () => new BehaviorSubject<any>(typeMock),
};

const speciesDtoMock: Partial<SpecieDTO> = {
  convertResponseToSpecie: () => {
    return new Specie();
  },
};

const typesDtoMock: Partial<TypesDTO> = {
  convertResponseToType: () => {
    return new Type();
  },
};

const pokemonDtoMock: Partial<PokemonDTO> = {
  convertResponseToPokemonCard: () => {
    return new Pokemon();
  },
};

const pokemonsServiceMock: Partial<PokemonsService> = {
  showMessage: () => {},
  getPokemons: () => {
    return new BehaviorSubject<any>(apiPokemonsResponseMock);
  },
  getPokemon: () => {
    return new BehaviorSubject<any>(pokemonMock);
  },
};

const snackBarServiceMock = {
  open: () => {},
};

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

export {
  specieServiceMock,
  typeServiceMock,
  speciesDtoMock,
  pokemonMock,
  typesDtoMock,
  pokemonDtoMock,
  evolutionChainMock,
  apiPokemonResponseMock,
  pokemonsServiceMock,
  snackBarServiceMock,
  typeMock,
  specieMock,
  apiPokemonsResponseMock,
  defaultErrorMessageMock,
  defaultServerErrorMock,
};
