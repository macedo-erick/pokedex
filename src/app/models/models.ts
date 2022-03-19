export class Pokemon {
  id: number;
  name: number;
  types: Type[];
  height: number;
  weight: number;
  abilities: Abilites[];
  sprites: Sprites;
  stats: Stats[];

  convertValues() {
    this.height = parseFloat((this.height / 10).toFixed(1));
    this.weight = parseFloat((this.weight / 10).toFixed(1));
  }
}

export class Type {
  slot: number;
  name: string;
  url: string;
  weakness: string[];
  resistence: string[];
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

export interface Sprites {
  back_default: string;
  front_default: string;
  front_bigger: string;
}

export class Stats {
  value: number;
  name: string;
}

export interface ApiResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonResponse[];
}

export interface PokemonResponse {
  name: string;
  url: string;
}

export class PokemonDTO {
  convertResponseToPokemon(data: any): Pokemon {
    let pokemon = new Pokemon();
    pokemon.id = data.id;
    pokemon.height = data.height;
    pokemon.weight = data.weight;
    pokemon.name = data.name;
    pokemon.stats = data.stats.map((s) => this.convertStat(s));
    pokemon.types = data.types.map((t) => this.convertType(t));
    pokemon.abilities = data.abilities;
    pokemon.sprites = data.sprites;
    pokemon.sprites.front_bigger =
      data.sprites.other['official-artwork'].front_default;
    pokemon.convertValues();

    return pokemon;
  }

  convertResponseToPokemonCard(data: any): Pokemon {
    let pokemon = new Pokemon();
    pokemon.id = data.id;
    pokemon.name = data.name;
    pokemon.types = data.types.map((t) => this.convertType(t));
    pokemon.sprites = data.sprites;
    pokemon.sprites.front_bigger =
      data.sprites.other['official-artwork'].front_default;

    return pokemon;
  }

  convertStat(data: any) {
    let stats = new Stats();
    stats.name = data.stat.name;
    stats.value = data.base_stat;

    return stats;
  }

  convertType(data: any) {
    let type = new Type();
    type.name = data.type.name;
    type.url = data.type.url;
    type.slot = data.slot;

    return type;
  }
}

export class TypesDTO {
  convertResponseToType(data: any) {
    let type = new Type();
    type.name = data.name;
    type.weakness = data.damage_relations.double_damage_from.map((i) => i.name);
    type.resistence = data.damage_relations.double_damage_to.map((i) => i.name);

    return type;
  }
}

export class Specie {
  id: number;
  text: string;
}

export class SpecieDTO {
  convertResponseToSpecie(data: any) {
    let specie = new Specie();
    specie.id = data.id;
    specie.text = data.flavor_text_entries[1].flavor_text;

    return specie;
  }
}
