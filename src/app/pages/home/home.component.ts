import { Component, OnInit } from '@angular/core';
import { ApiResponse, Pokemon, PokemonDTO } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  next: string;
  pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private baseService: BaseService,
    private pokemonDTO: PokemonDTO
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe(
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
        )
          .then((results) => {
            results.map((r) =>
              this.pokemons.push(
                this.pokemonDTO.convertResponseToPokemonCard(r)
              )
            );
          })
          .catch((err) => {
            return err;
          });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  loadPokemons() {
    this.baseService.get(this.next).then((res: ApiResponse) => {
      this.next = res.next;

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
        results.forEach((p) =>
          this.pokemons.push(this.pokemonDTO.convertResponseToPokemonCard(p))
        );
      });
    });
  }
}
