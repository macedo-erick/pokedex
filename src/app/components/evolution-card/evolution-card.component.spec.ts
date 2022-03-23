import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {
  defaultErrorMessageMock,
  defaultServerErrorMock,
  evolutionChainMock,
  pokemonMock,
  specieServiceMock,
} from 'src/app/helpers/testHelpers';
import { EvolutionDTO } from 'src/app/models/models';
import { BaseService } from 'src/app/services/base/base.service';
import { SpeciesService } from 'src/app/services/species/species.service';

import { EvolutionCardComponent } from './evolution-card.component';

describe('EvolutionCardComponent', () => {
  let component: EvolutionCardComponent;
  let fixture: ComponentFixture<EvolutionCardComponent>;
  let baseService: BaseService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EvolutionCardComponent],
      providers: [
        { provide: SpeciesService, useValue: specieServiceMock },
        EvolutionDTO,
        BaseService,
      ],
    }).compileComponents();

    baseService = TestBed.inject(BaseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionCardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonMock;
    component.evolutionChain = { evolutions: ['1', '2', '3'] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test get evolutions', fakeAsync(() => {
    let req = httpController.expectOne(
      'https://pokeapi.co/api/v2/pokemon-species/1'
    );
    req.flush(evolutionChainMock);
  }));

  it('Test get evolutions (Exception)', fakeAsync(() => {
    let req = httpController.expectOne(
      'https://pokeapi.co/api/v2/pokemon-species/1'
    );

    req.flush(defaultErrorMessageMock, defaultServerErrorMock);
  }));
});
