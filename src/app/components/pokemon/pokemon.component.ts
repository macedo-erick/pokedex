import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/models';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';

@Component({
  selector: 'poke-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  @Input() name: string | undefined;;
  pokemon: Pokemon | undefined;

  constructor(
    private pokemonService: PokemonsService,
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getPokemon(this.name).subscribe((pokemon) => {
      this.pokemon = pokemon;
    });
  }
}
