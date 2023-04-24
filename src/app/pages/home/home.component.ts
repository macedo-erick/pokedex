import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { forkJoin, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from "rxjs/operators";
import { apiPokemonResponse, Pokemon } from "src/app/models/models";
import { BaseService } from "src/app/services/base/base.service";
import { PokemonsService } from "src/app/services/pokemons/pokemon.service";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  next: string | undefined;
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  loaded = false;
  search = new FormControl({ value: "", disabled: false });

  constructor(
    private pokemonsService: PokemonsService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.getPokemons();
    this.searchHandler();
  }

  getPokemons() {
    this.pokemonsService
      .getPokemons()
      .pipe(
        tap((res) => (this.next = res.next)),
        map((res) => res.results),
        switchMap((results) =>
          forkJoin(results.map((pokemon) => this.baseService.get(pokemon.url)))
        )
      )
      .subscribe({
        next: (pokemons) => {
          this.pokemons = pokemons;
          this.loaded = true;
        },
        error: (err) => {
          this.loaded = true;
          console.log(err);
        },
      });
  }

  loadPage() {
    this.baseService
      .get(this.next as string)
      .pipe(
        tap((res) => (this.next = res.next)),
        map((res) => res.results),
        switchMap((results: apiPokemonResponse[]) =>
          forkJoin(
            results.map((pokemon: apiPokemonResponse) =>
              this.baseService.get(pokemon.url)
            )
          )
        )
      )
      .subscribe({
        next: (pokemons) => {
          this.pokemons.push(...pokemons);
          this.loaded = true;
        },
        error: (err) => {
          console.log(err);
          this.loaded = true;
        },
      });
  }

  searchHandler() {
    this.search.valueChanges
      .pipe(
        map((text) => text.trim().toLowerCase()),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((query) => {
          /* istanbul ignore else */
          if (query.length) {
            return this.pokemonsService.getPokemons(0, 1500).pipe(
              tap((res) => (this.next = res.next)),
              map((res) => res.results),
              map((results) =>
                results.filter((pokemon) => pokemon.name.includes(query))
              )
            );
          }

          return this.pokemonsService.getPokemons(0, 50).pipe(
            tap((res) => (this.next = res.next)),
            map((res) => res.results)
          );
        }),
        switchMap((pokemons) => {
          /* istanbul ignore else */
          if (pokemons.length) {
            return forkJoin(
              pokemons.map((pokemon) => this.baseService.get(pokemon.url))
            );
          }

          return of([]);
        })
      )
      .subscribe((res) => {
        this.pokemons = res;
        this.loaded = true;
      });
  }
}
