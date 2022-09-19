import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  evolutionChainMock,
  specieMock,
  specieServiceMock,
} from 'src/app/helpers/testHelpers';
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
        BaseService,
      ],
    }).compileComponents();

    baseService = TestBed.inject(BaseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionCardComponent);
    component = fixture.componentInstance;
    component.evolutionChain = { evolutions: ['1', '2', '3'] };
    component.specie = specieMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing getEvolution()', () => {
    spyOn(baseService, 'get').and.returnValue(of(evolutionChainMock));
    component.getEvolution();
  });

  it('Testing getEvolution()', () => {
    component.specie.evolution_chain = undefined;
  });

  it('Testing get specie()', () => {
    component.specie;
  });
});
