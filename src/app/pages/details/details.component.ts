import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, Specie } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pokemon: Pokemon;
  id: string | number;
  varietie: string;
  specie: Specie;
  varieties: any[];

  constructor(
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
    private router: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.getPokemon();
    /* istanbul ignore next */
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  getPokemon() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.varietie = this.route.snapshot.paramMap.get('name');

    this.pokemonsService.getPokemon(this.varietie ? this.varietie : this.id).subscribe(
      (response) => {
        this.pokemon = response;
        this.getSpecie(response.species?.url);
      },
      (err) => {
        return err;
      }
    );
  }

  getSpecie(url: string) {
    this.baseService
      .get(url)
      .then((res) => {
        this.specie = res;
        this.varieties = res.varieties.map((r) => r.pokemon.name);
      })
      .catch((err) => {
        return err;
      });
  }
}
