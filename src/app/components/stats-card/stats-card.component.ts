import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/models';

@Component({
  selector: 'stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor() {}

  ngOnInit(): void {}

  get total() {
    let sum = 0;
    this.pokemon.stats.forEach((stat) => (sum += stat.value));

    return sum;
  }
}
