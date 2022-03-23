import { evolutionChainMock } from '../helpers/testHelpers';
import {
  EvolutionChain,
  EvolutionDTO,
  Pokemon,
  PokemonDTO,
  Specie,
  SpecieDTO,
  Stats,
  Type,
  TypesDTO,
} from './models';

const pokemonDTO = new PokemonDTO();
const stat = new Stats();
stat.name = 'Test data';
stat.value = 1;

const type = new Type();
type.name = 'Test data';
type.url = '';
type.slot = 0;

const data = {
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
};

const convertedPokemonData = new Pokemon();
convertedPokemonData.id = 1;
convertedPokemonData.weight = 1;
convertedPokemonData.height = 1;
convertedPokemonData.name = 'Test data';
convertedPokemonData.stats = [stat];
convertedPokemonData.types = [type];
convertedPokemonData.sprites = {
  front_bigger: 'Test data',
  other: { 'official-artwork': { front_default: 'Test data' } },
};
convertedPokemonData.abilities = undefined;

const convertedPokemonCardData = new Pokemon();
convertedPokemonCardData.id = 1;
convertedPokemonCardData.name = 'Test data';
convertedPokemonCardData.types = [type];
convertedPokemonCardData.sprites = {
  front_bigger: 'Test data',
  other: { 'official-artwork': { front_default: 'Test data' } },
};

describe('Testing Pokemon model', () => {
  it('Testing convert values', () => {
    const pokemon = new Pokemon();
    pokemon.height = 10;
    pokemon.weight = 10;

    pokemon.calcDimensions();

    expect(pokemon.height).toBe(1);
    expect(pokemon.weight).toBe(1);
  });
});

describe('Testing PokemonDTO model', () => {
  it('Testing convertResponseToPokemon', () => {
    const pokemon = pokemonDTO.convertResponseToPokemon(data);
    expect(pokemon).toEqual(convertedPokemonData);
  });

  it('Testing convertResponseToPokemonCard', () => {
    const pokemon = pokemonDTO.convertResponseToPokemonCard(data);
    expect(pokemon).toEqual(convertedPokemonCardData);
  });
});

describe('Testing TypesDTO model', () => {
  const typeDTO = new TypesDTO();
  const data = {
    name: 'Test type',
    damage_relations: {
      double_damage_from: [{ name: 'Test type' }],
      double_damage_to: [{ name: 'Test type' }],
    },
  };

  const convertedData: Type = new Type();
  convertedData.name = 'Test type';
  convertedData.resistences = ['Test type'];
  convertedData.weaknesses = ['Test type'];

  it('Test converResponseToType', () => {
    const type = typeDTO.convertResponseToType(data);
    expect(type).toEqual(convertedData);
  });
});

describe('Testing SpeciesDTO model', () => {
  const specieDTO = new SpecieDTO();
  const data = {
    id: 1,
    flavor_text_entries: [{}, { flavor_text: 'Test data' }],
  };

  const convertData: Specie = new Specie();
  convertData.id = 1;
  convertData.text = 'Test data';

  it('Testing convertResponseToSpecie', () => {
    const specie = specieDTO.convertResponseToSpecie(data);

    expect(specie).toEqual(convertData);
  });
});

describe('Testing EvolotiunDTO model', () => {
  let evolutionDTO = new EvolutionDTO();
  let data = JSON.parse(JSON.stringify(evolutionChainMock));

  beforeEach(() => {
    data = JSON.parse(JSON.stringify(evolutionChainMock));
  });

  it('test convertResponseToEvolution - case 1', () => {
    const convertData: EvolutionChain = new EvolutionChain();
    convertData.evolutions = ['Test', undefined, undefined];

    data.chain.evolves_to[0] = undefined;

    expect(convertData).toEqual(evolutionDTO.convertResponseToEvolution(data));
  });

  it('test convertResponseToEvolution - case 2', () => {
    const convertData: EvolutionChain = new EvolutionChain();
    convertData.evolutions = ['Test', 'Test 1', undefined];

    data.chain.evolves_to[0].evolves_to[0] = undefined;

    expect(convertData).toEqual(evolutionDTO.convertResponseToEvolution(data));
  });
});
