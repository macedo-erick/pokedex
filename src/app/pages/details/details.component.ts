import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, PokemonDTO } from 'src/app/models/models';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pokemon: Pokemon;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
    private dto: PokemonDTO,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemon();
    /* istanbul ignore next */
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  getPokemon() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pokemonsService.getPokemon(this.id).subscribe((response) => {
      this.pokemon = this.dto.convertResponseToPokemon(response);
    }, (err) => {
      return err;
    });
  }
}
