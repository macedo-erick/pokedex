import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Pokemon,
  Specie,
  SpecieDTO,
  Type,
  TypesDTO,
} from 'src/app/models/models';
import { SpeciesService } from 'src/app/services/species/species.service';
import { TypesService } from 'src/app/services/types/types.service';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss'],
})
export class AboutCardComponent implements OnInit {
  @Input() pokemon: Pokemon = new Pokemon();
  specie: Specie;
  types: Type[] = [];

  constructor(
    private route: ActivatedRoute,
    private specieService: SpeciesService,
    private typesService: TypesService,
    private specieDto: SpecieDTO,
    private typesDto: TypesDTO
  ) {}

  ngOnInit(): void {
    this.getSpecie();
    this.getTypes();
  }

  getSpecie() {
    let id = this.route.snapshot.paramMap.get('id');
    this.specieService.getSpecie(parseInt(id)).subscribe(
      (res) => {
        this.specie = this.specieDto.convertResponseToSpecie(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getTypes() {
    Promise.all(
      this.pokemon.types.map((type) => {
        return this.typesService
          .getType(type.name)
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
