import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, PokemonDTO } from 'src/app/models/models';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private dto: PokemonDTO,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemon();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  getPokemon() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id).subscribe((response) => {
      this.pokemon = this.dto.convertResponseToPokemon(response);
    }, (err) => {
      console.error(err);
    });
  }
}
