import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { convertResponseToEvolution } from 'src/app/helpers/utils';
import { Evolutions, Specie } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'poke-evolution-card',
  templateUrl: './evolution-card.component.html',
  styleUrls: ['./evolution-card.component.scss'],
})
export class EvolutionCardComponent implements OnInit {
  evolutionChain: Evolutions | undefined;
  private _specie = new BehaviorSubject<Specie>({});

  constructor(private baseService: BaseService) {}

  get specie() {
    return this._specie.getValue();
  }

  @Input() set specie(specie: Specie) {
    this._specie.next(specie);
  }

  ngOnInit(): void {
    this.getEvolution();
  }

  getEvolution() {
    this._specie?.subscribe((specie) => {
      this.baseService
        .get(specie?.evolution_chain?.url as string)
        .subscribe((res) => {
          this.evolutionChain = {
            evolutions: convertResponseToEvolution(res),
          };
        });
    });
  }
}
