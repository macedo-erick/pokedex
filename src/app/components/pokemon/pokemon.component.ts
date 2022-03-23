import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonDTO } from 'src/app/models/models';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';

@Component({
  selector: 'pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  @Input() name: string;
  pokemon: Pokemon;

  constructor(private pokemonService: PokemonsService, private pokemonDto: PokemonDTO) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getPokemon(this.name).subscribe(pokemon => {
      this.pokemon = this.pokemonDto.convertResponseToPokemonCard(pokemon);
    });
  }
}
