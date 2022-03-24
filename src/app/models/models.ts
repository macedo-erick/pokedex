export class Pokemon {
  id: number;
  name: string;
  types: Types[];
  stats: Stats[];
  abilities: Abilites[];
  species: Specie;
  sprites: Sprite;
  height: number;
  weight: number;

  constructor() {
    this.abilities = [];
    this.types = [];
    this.stats = [];
  }
}

export class Types {
  slot: number;
  type: Type;
  weaknesses?: string[];
  resistences?: string[];
}

export class Type {
  name: string;
  url: string;
}

export class Stats {
  name: string;
  base_stat: number;
}

export class Abilites {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export class Ability {
  name: string;
  url: string;
}

export class Specie {
  id: number | string;
  name: string;
  url: string;
  flavor_text_entries: FlavorText[];
  evolution_chain: EvolutionChain;
}

export class FlavorText {
  flavor_text: string;
}

export class EvolutionChain {
  url: string;
}

export class Sprite {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export class Evolutions {
  evolutions: string[];

  constructor() {
    this.evolutions = [];
  }
}

export interface apiPokemonsResponse {
  count?: number;
  next?: string;
  previous?: string;
  results: apiPokemonResponse[];
}

export interface apiPokemonResponse {
  name: string;
  url: string;
}

export class TypesDTO {
  convertResponseToType?(data: any) {
    let type = new Types();
    type.weaknesses = data.damage_relations.double_damage_from.map(
      (i) => i.name
    );
    type.resistences = data.damage_relations.double_damage_to.map(
      (i) => i.name
    );

    return type;
  }
}

export class EvolutionsDTO {
  convertResponseToEvolution?(data: any) {
    let evolutions = new Evolutions();

    evolutions.evolutions.push(
      data.chain.species.name,
      data.chain.evolves_to[0]?.species.name,
      data.chain.evolves_to[0]?.evolves_to[0]?.species.name
    );

    return evolutions;
  }
}
