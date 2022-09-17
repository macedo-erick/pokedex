/* istanbul ignore file */
import { Type } from "../models/models";

export function navigateBack() {
  window.history.back();
}

export function convertResponseToEvolution(data: any) {
  return [
    data.chain.species.name,
    data.chain.evolves_to[0]?.species.name,
    data.chain.evolves_to[0]?.evolves_to[0]?.species.name,
  ];
}

export function convertResponseToType(data: any) {
  return {
    weaknesses: data.damage_relations.double_damage_from.map(
      (i: Type) => i.name
    ),
    resistences: data.damage_relations.double_damage_to.map(
      (i: Type) => i.name
    ),
  };
}
