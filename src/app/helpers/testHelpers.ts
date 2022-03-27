/* istanbul ignore file */

import { BehaviorSubject, defer } from 'rxjs';
import {
  EvolutionChain,
  Pokemon,
  Specie,
  Type,
  Types,
  TypesDTO,
} from '../models/models';
import { PokemonsService } from '../services/pokemons/pokemon.service';
import { SpeciesService } from '../services/species/species.service';
import { TypesService } from '../services/types/types.service';

const typeMock = new Types();
typeMock.type = new Type();
typeMock.type.name = 'grass';
typeMock.type.url = 'https://pokeapi.co/api/v2/type/1';
typeMock.weaknesses = ['ice'];
typeMock.resistences = ['ice'];

const evolutionMock = new EvolutionChain();
evolutionMock.url = 'https://pokeapi.co/api/v2/evolution-chain/1/';

const specieMock = new Specie();
specieMock.id = 1;
specieMock.flavor_text_entries = [{ flavor_text: '' }, { flavor_text: '' }];
specieMock.flavor_text_entries[1].flavor_text = 'Test data';
specieMock.evolution_chain = evolutionMock;
specieMock.url = 'https://pokeapi.co/api/v2/pokemon-species/1';
specieMock.varieties = [
  { pokemon: { name: 'Test data' } },
  { pokemon: { name: 'Test data' } },
];

const pokemonMock = new Pokemon();
pokemonMock.id = 1;
pokemonMock.name = 'Test';
pokemonMock.height = 10;
pokemonMock.weight = 10;
pokemonMock.types = [
  {
    type: { name: 'Test', url: '' },
    slot: 1,
    resistences: ['ice'],
    weaknesses: ['ice'],
  },
];
pokemonMock.abilities = [
  { ability: { name: 'Test', url: '' }, is_hidden: false, slot: 1 },
];
pokemonMock.sprites = {
  other: { 'official-artwork': { front_default: 'Test data' } },
};
pokemonMock.stats = [
  { name: 'Test', base_stat: 10 },
  { name: 'Test', base_stat: 30 },
  { name: 'Test', base_stat: 40 },
  { name: 'Test', base_stat: 70 },
  { name: 'Test', base_stat: 60 },
  { name: 'Test', base_stat: 50 },
];
pokemonMock.species = specieMock;
pokemonMock.species.url = 'https://pokeapi.co/api/v2/pokemon-species/1';

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

const typesDtoMock: Partial<TypesDTO> = {
  convertResponseToType: () => {
    return new Types();
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
  pokemonMock,
  typesDtoMock,
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
