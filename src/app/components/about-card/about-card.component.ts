import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon, Specie, Types, TypesDTO } from 'src/app/models/models';
import { TypesService } from 'src/app/services/types/types.service';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss'],
})
export class AboutCardComponent implements OnInit {
  private _pokemon = new BehaviorSubject<Pokemon>(null);
  @Input() specie: Specie;
  types: Types[] = [];

  constructor(private typesService: TypesService, private typesDto: TypesDTO) {}

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
    this._pokemon.subscribe((r) => {
      this.pokemon?.types.map((type) => {
        return this.typesService
          .getType(type.type.name)
          .toPromise()
          .then((res) =>
            this.types.push(this.typesDto.convertResponseToType(res))
          )
          .catch((err) => err);
      });
    });
  }

  get weaknesses() {
    let weak = [];
    for (const type of this.types) {
      weak = weak.concat(type.weaknesses);
    }

    return Array.from(new Set(weak));
  }

  get resistances() {
    let resistance = [];
    for (const type of this.types) {
      resistance = resistance.concat(type.resistences);
    }

    return Array.from(new Set(resistance));
  }
}
