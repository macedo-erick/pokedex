import { evolutionChainMock } from '../helpers/testHelpers';
import { Evolutions, EvolutionsDTO, Types, TypesDTO } from './models';

describe('Testing TypesDTO model', () => {
  const typeDTO = new TypesDTO();
  const data = {
    name: 'Test type',
    damage_relations: {
      double_damage_from: [{ name: 'Test type' }],
      double_damage_to: [{ name: 'Test type' }],
    },
  };

  const convertedData: Types = new Types();
  convertedData.resistences = ['Test type'];
  convertedData.weaknesses = ['Test type'];

  it('Test converResponseToType', () => {
    const type = typeDTO.convertResponseToType(data);
    expect(type).toEqual(convertedData);
  });
});

describe('Testing EvolotiunDTO model', () => {
  let evolutionDTO = new EvolutionsDTO();
  let data = JSON.parse(JSON.stringify(evolutionChainMock));

  beforeEach(() => {
    data = JSON.parse(JSON.stringify(evolutionChainMock));
  });

  it('test convertResponseToEvolution - case 1', () => {
    const convertData: Evolutions = new Evolutions();
    convertData.evolutions = ['Test', undefined, undefined];

    data.chain.evolves_to[0] = undefined;

    expect(convertData).toEqual(evolutionDTO.convertResponseToEvolution(data));
  });

  it('test convertResponseToEvolution() - (Case 2)', () => {
    const convertData: Evolutions = new Evolutions();
    convertData.evolutions = ['Test', 'Test 1', undefined];

    data.chain.evolves_to[0].evolves_to[0] = undefined;

    expect(convertData).toEqual(evolutionDTO.convertResponseToEvolution(data));
  });

  it('test convertResponseToEvolution() - (Case 2)', () => {
    const convertData: Evolutions = new Evolutions();
    convertData.evolutions = ['Test', 'Test 1', undefined];

    data.chain.evolves_to[0].evolves_to[0].species.name = undefined;

    expect(convertData).toEqual(evolutionDTO.convertResponseToEvolution(data));
  });
});
