import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/models';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  private pokemon$ = new BehaviorSubject<Pokemon>({});

  get pokemon() {
    return this.pokemon$.getValue();
  }

  @Input() set pokemon(value: Pokemon) {
    this.pokemon$.next(value);
  }

  get type() {
    return this.pokemon$.pipe(
      map((pokemon) => (pokemon.types ? pokemon.types[0].type?.name : 'grass'))
    );
  }

  constructor() {}

  ngOnInit(): void {}
}
