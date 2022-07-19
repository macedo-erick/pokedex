import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {
  asyncData,
  asyncError,
  pokemonMock,
  specieMock,
  specieServiceMock,
} from 'src/app/helpers/testHelpers';
import { EvolutionsDTO } from 'src/app/models/models';
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
        EvolutionsDTO,
        BaseService,
      ],
    }).compileComponents();

    baseService = TestBed.inject(BaseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionCardComponent);
    component = fixture.componentInstance;
    // component.pokemon = pokemonMock;
    component.evolutionChain = { evolutions: ['1', '2', '3'] };
    component.specie = specieMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing getEvolution()', fakeAsync(() => {
    spyOn(baseService, 'get').and.resolveTo(asyncData(specieMock));

    let req = httpController.expectOne(
      'https://pokeapi.co/api/v2/evolution-chain/1/'
    );
    req.flush(specieMock);
  }));

  it('Testing get specie', fakeAsync(() => {
    component.specie;
  }));

  it('Testing getEvolution() - (Empty esponse)', fakeAsync(() => {
    component.specie = undefined;

    let req = httpController.expectOne(
      'https://pokeapi.co/api/v2/evolution-chain/1/'
    );
    req.flush({});
  }));

  it('Testing getEvolution() - (Exception)', fakeAsync(() => {
    spyOn(baseService, 'get').and.rejectWith(asyncError(specieMock));

    let req = httpController.expectOne(
      'https://pokeapi.co/api/v2/evolution-chain/1/'
    );
    req.flush(specieMock);
  }));
});
