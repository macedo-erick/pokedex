import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, Specie } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pokemon: Pokemon | undefined;
  id: string | number | undefined;
  variety: string | undefined;
  specie: Specie | undefined;
  varieties: any[] | undefined;

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
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.variety = this.route.snapshot.paramMap.get('name') as string;

    this.pokemonsService
      .getPokemon(this.variety ? this.variety : this.id)
      .subscribe(
        (response) => {
          this.pokemon = response;
          this.getSpecie(response.species?.url as string);
        },
        (err) => {
          return err;
        }
      );
  }

  getSpecie(url: string) {
    this.baseService.get(url).subscribe((res) => {
      this.specie = res;
      this.varieties = res.varieties.map((r: any) => r.pokemon.name);
    });
  }

  get mobile() {
    const userAgent = navigator.userAgent;

    /* istanbul ignore next */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return true;
    }

    return false;
  }
}
