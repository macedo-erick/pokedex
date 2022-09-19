import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/models/models';

@Component({
  selector: 'poke-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent {
  private _pokemon = new BehaviorSubject<Pokemon>({});

  get pokemon() {
    return this._pokemon.getValue();
  }

  @Input() set pokemon(pokemon: Pokemon) {
    this._pokemon.next(pokemon);
  }

  get total() {
    let sum = 0;
    this.pokemon?.stats?.forEach((stat) => (sum += stat.base_stat));

    return sum;
  }
}
