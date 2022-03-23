import { Component, Input, OnInit } from '@angular/core';
import { EvolutionChain, EvolutionDTO, Pokemon } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';
import { SpeciesService } from 'src/app/services/species/species.service';

@Component({
  selector: 'evolution-card',
  templateUrl: './evolution-card.component.html',
  styleUrls: ['./evolution-card.component.scss'],
})
export class EvolutionCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  evolutionChain: EvolutionChain;

  constructor(
    private evolutionDto: EvolutionDTO,
    private speciesService: SpeciesService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.getEvolution();
  }

  getEvolution() {
    this.speciesService.getSpecie(this.pokemon.id).subscribe(result => {
      this.baseService.get(result.evolution_chain.url).then((res) => {
        this.evolutionChain = this.evolutionDto.convertResponseToEvolution(res);
      }). catch(err => {
        console.log(err);
      });
    })
  }
}
