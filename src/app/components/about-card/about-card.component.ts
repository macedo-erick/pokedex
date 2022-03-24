import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Pokemon, Specie, Types, TypesDTO } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';
import { TypesService } from 'src/app/services/types/types.service';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss'],
})
export class AboutCardComponent implements OnInit {
  @Input() pokemon: Pokemon = new Pokemon();
  specie: Specie;
  types: Types[] = [];

  constructor(
    private typesService: TypesService,
    private typesDto: TypesDTO,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.getSpecie();
    this.getTypes();
  }

  getSpecie() {
    this.baseService
      .get(this.pokemon.species.url)
      .then((res) => {
        this.specie = res;
      })
      .catch((err) => {
        return err;
      });
  }

  getTypes() {
    Promise.all(
      this.pokemon.types.map((type) => {
        return this.typesService
          .getType(type.type.name)
          .toPromise()
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      })
    ).then((res) => {
      res.map((i) => this.types.push(this.typesDto.convertResponseToType(i)));
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
