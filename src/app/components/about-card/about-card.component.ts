import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { convertResponseToType } from 'src/app/helpers/utils';
import { Pokemon, Specie, Types } from 'src/app/models/models';
import { TypesService } from 'src/app/services/types/types.service';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss'],
})
export class AboutCardComponent implements OnInit {
  @Input() specie: Specie | undefined;
  types: Types[] = [];
  private _pokemon = new BehaviorSubject<Pokemon>({});

  constructor(private typesService: TypesService) {}

  @Input() set pokemon(pokemon: Pokemon) {
    this._pokemon.next(pokemon);
  }

  get pokemon() {
    return this._pokemon.getValue();
  }

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this._pokemon.subscribe(() => {
      this.pokemon.types?.map((type) => {
        return this.typesService
          .getType(type.type?.name)
          .subscribe((res) => this.types.push(convertResponseToType(res)));
      });
    });
  }

  get weaknesses() {
    let weak: any[] = [];
    for (const type of this.types) {
      weak = weak.concat(type.weaknesses);
    }

    return Array.from(new Set(weak));
  }

  get resistances() {
    let resistance: any[] = [];
    for (const type of this.types) {
      resistance = resistance.concat(type.resistences);
    }

    return Array.from(new Set(resistance));
  }

  get mobile() {
    const userAgent = navigator.userAgent;

    /* istanbul ignore next */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return true;
    }

    return false;
  }
}
