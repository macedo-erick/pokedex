import { Component, Input, OnInit } from '@angular/core';
import { Evolutions, EvolutionsDTO, Pokemon } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'evolution-card',
  templateUrl: './evolution-card.component.html',
  styleUrls: ['./evolution-card.component.scss'],
})
export class EvolutionCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  evolutionChain: Evolutions;

  constructor(
    private evolutionDto: EvolutionsDTO,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.getEvolution();
  }

  getEvolution() {
    this.baseService.get(this.pokemon.species.url).then((result) => {
      this.baseService
        .get(result.evolution_chain.url)
        .then((res) => {
          this.evolutionChain =
            this.evolutionDto.convertResponseToEvolution(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
