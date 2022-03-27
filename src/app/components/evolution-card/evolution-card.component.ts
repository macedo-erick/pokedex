import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Evolutions, EvolutionsDTO, Specie } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'evolution-card',
  templateUrl: './evolution-card.component.html',
  styleUrls: ['./evolution-card.component.scss'],
})
export class EvolutionCardComponent implements OnInit {
  private _specie = new BehaviorSubject<Specie>(null);
  evolutionChain: Evolutions;

  constructor(
    private evolutionDto: EvolutionsDTO,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.getEvolution();
  }

  @Input() set specie(specie: Specie) {
    this._specie.next(specie);
  }

  get specie() {
    return this._specie.getValue();
  }

  getEvolution() {
    this._specie.subscribe((r) => {
      this.baseService
        .get(r?.evolution_chain?.url)
        .then((res) => {
          this.evolutionChain =
            this.evolutionDto.convertResponseToEvolution(res);
        })
        .catch((err) => {
          return err;
        });
    });
  }
}
