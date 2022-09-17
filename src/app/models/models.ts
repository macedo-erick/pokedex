/* istanbul ignore file */
export interface Pokemon {
  id?: number;
  name?: string;
  types?: Types[];
  stats?: Stats[];
  abilities?: Abilites[];
  species?: Specie;
  sprites?: Sprite;
  height?: number;
  weight?: number;
}

export interface Types {
  slot?: number;
  type?: Type;
  weaknesses?: string[];
  resistences?: string[];
}

export interface Type {
  name: string;
  url: string;
}

export interface Stats {
  name: string;
  base_stat: number;
}

export interface Abilites {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Ability {
  name: string;
  url: string;
}

export interface Specie {
  id?: number | string;
  name?: string;
  url?: string;
  flavor_text_entries?: FlavorText[];
  evolution_chain?: EvolutionChain;
  varieties?: any[];
}

export interface FlavorText {
  flavor_text: string;
}

export interface EvolutionChain {
  url: string;
}

export interface Sprite {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface Evolutions {
  evolutions: string[];
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
