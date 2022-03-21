import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpeciesService } from 'src/app/services/species/species.service';
import { TypesService } from 'src/app/services/types/types.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AboutCardComponent } from './about-card.component';
import { BehaviorSubject, throwError } from 'rxjs';
import { Specie, SpecieDTO, Type, TypesDTO } from 'src/app/models/models';
import { FormatDescriptionPipe } from 'src/app/pipes/format-description.pipe';
import { CommonModule } from '@angular/common';
import {
  asyncData,
  defaultServerErrorMock,
  speciesDtoMock,
  specieServiceMock,
  typeMock,
  typesDtoMock,
  typeServiceMock,
} from 'src/app/helpers/testHelpers';

describe('AboutCardComponent', () => {
  let component: AboutCardComponent;
  let fixture: ComponentFixture<AboutCardComponent>;
  let speciesService: SpeciesService;
  let typesService: TypesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, CommonModule],
      declarations: [AboutCardComponent, FormatDescriptionPipe],
      providers: [
        { provide: SpeciesService, useValue: specieServiceMock },
        { provide: TypesService, useValue: typeServiceMock },
        { provide: SpecieDTO, useValue: speciesDtoMock },
        { provide: TypesDTO, useValue: typesDtoMock },
      ],
    }).compileComponents();

    speciesService = TestBed.inject(SpeciesService);
    typesService = TestBed.inject(TypesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCardComponent);
    component = fixture.componentInstance;
    component.pokemon.types = [typeMock];
    component.types = [typeMock];
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Test getSpecie - Exception', () => {
    spyOn(speciesService, 'getSpecie')
      .and.callThrough()
      .and.returnValue(throwError(defaultServerErrorMock));

    component.getSpecie();
  });

  it('Test getTypes', fakeAsync(() => {
    spyOn(typesService, 'getType')
      .and.callThrough()
      .and.returnValue(asyncData(typeMock));
    component.getTypes();
  }));

  it('Test getTypes - Exception', fakeAsync(() => {
    spyOn(typesService, 'getType')
      .and.callThrough()
      .and.returnValue(throwError(defaultServerErrorMock));
    component.getTypes();
  }));
});
