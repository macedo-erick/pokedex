import { Component, OnInit } from '@angular/core';
import {
  apiPokemonsResponse,
  Pokemon,
} from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  next: string;
  pokemons: Pokemon[] = [];
  loaded = false;

  constructor(
    private pokemonsService: PokemonsService,
    private baseService: BaseService,
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonsService.getPokemons().subscribe(
      (response) => {
        this.next = response.next;

        Promise.all(
          response.results.map((pokemon) => {
            return this.baseService
              .get(pokemon.url)
              .then((response) => {
                return response;
              })
              .catch((err) => {
                return err;
              });
          })
        ).then((results) => {
          this.pokemons = [];
          this.loaded = true;
          results.map((r) =>
            this.pokemons.push(r)
          );
        });
      },
      (err) => {
        this.loaded = true;
        console.error(err);
      }
    );
  }

  loadPokemons() {
    this.baseService
      .get(this.next)
      .then((res: apiPokemonsResponse) => {
        this.next = res.next;
        this.promisesHandler(res);
      })
      .catch((err) => {
        return err;
      });
  }

  promisesHandler(res: any) {
    Promise.all(
      res.results.map((p) => {
        return this.baseService
          .get(p.url)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err;
          });
      })
    ).then((results) => {
      results.forEach((p: Pokemon) =>
        this.pokemons.push(p)
      );
    });
  }

  search(query: string) {
    if (query.trim().length) {
      this.pokemonsService.getPokemons(0, 1500).subscribe((response) => {
        this.next = null;
        const filteredResults = response.results.filter((p) =>
          p.name.includes(query)
        );

        Promise.all(
          filteredResults.map((r) => {
            return this.baseService
              .get(r.url)
              .then((res) => {
                return res;
              })
              .catch((err) => {
                return err;
              });
          })
        ).then((results) => {
          this.pokemons = [];
          results.forEach((p) =>
            this.pokemons.push(p)
          );
        });
      });
    } else {
      this.getPokemons();
    }
  }
}
