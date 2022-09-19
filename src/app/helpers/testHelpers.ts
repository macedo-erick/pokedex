/* istanbul ignore file */
import { defer, of } from 'rxjs';
import { EvolutionChain, Pokemon, Specie, Types } from '../models/models';
import { PokemonsService } from '../services/pokemons/pokemon.service';
import { SpeciesService } from '../services/species/species.service';
import { TypesService } from '../services/types/types.service';

let typeMock: Types = {
  type: {
    name: 'grass',
    url: 'https://pokeapi.co/api/v2/type/1',
  },
  weaknesses: ['ice'],
  resistences: ['ice'],
};

const evolutionMock: EvolutionChain = {
  url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
};

const specieMock: Specie = {
  id: 1,
  flavor_text_entries: [{ flavor_text: '' }, { flavor_text: 'Teste Data' }],
  evolution_chain: evolutionMock,
  url: 'https://pokeapi.co/api/v2/pokemon-species/1',
  varieties: [
    { pokemon: { name: 'Test data' } },
    { pokemon: { name: 'Test data' } },
  ],
};

const pokemonMock: Pokemon = {
  id: 1,
  name: 'Test',
  height: 10,
  weight: 10,
  types: [
    {
      type: { name: 'Test', url: '' },
      slot: 1,
      resistences: ['ice'],
      weaknesses: ['ice'],
    },
  ],
  abilities: [
    { ability: { name: 'Test', url: '' }, is_hidden: false, slot: 1 },
  ],
  sprites: {
    other: { 'official-artwork': { front_default: 'Test data' } },
  },
  stats: [
    { name: 'Test', base_stat: 10 },
    { name: 'Test', base_stat: 30 },
    { name: 'Test', base_stat: 40 },
    { name: 'Test', base_stat: 70 },
    { name: 'Test', base_stat: 60 },
    { name: 'Test', base_stat: 50 },
  ],
  species: specieMock,
};

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

const weaknessesResistencesMock = {
  damage_relations: {
    double_damage_from: [{ name: 'test' }],
    double_damage_to: [{ name: 'test' }],
  },
};

// const evolutionChainMock = {
//   chain: {
//     species: {
//       name: 'test',
//     },
//     evolves_to: [
//       {
//         species: {
//           name: 'test',
//         },
//         evolves_to: [
//           {
//             species: {
//               name: 'test',
//             },
//           },
//         ],
//       },
//     ],
//   },
// };

const apiPokemonResponseMock = {
  name: 'test',
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
  getSpecie: () => of(specieMock),
};

const typeServiceMock: Partial<TypesService> = {
  showMessage: () => {},
  getType: () => of(typeMock),
};

const pokemonsServiceMock: Partial<PokemonsService> = {
  showMessage: () => {},
  getPokemons: () => of(apiPokemonsResponseMock),
  getPokemon: () => of(pokemonMock),
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
  evolutionChainMock,
  apiPokemonResponseMock,
  pokemonsServiceMock,
  snackBarServiceMock,
  specieMock,
  apiPokemonsResponseMock,
  defaultErrorMessageMock,
  defaultServerErrorMock,
  typeMock,
  weaknessesResistencesMock,
};
