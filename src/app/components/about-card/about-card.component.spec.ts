import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpeciesService } from 'src/app/services/species/species.service';
import { TypesService } from 'src/app/services/types/types.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AboutCardComponent } from './about-card.component';
import { throwError } from 'rxjs';
import { TypesDTO } from 'src/app/models/models';
import { FormatTextPipe } from 'src/app/pipes/format-text/format-text.pipe';
import { CommonModule } from '@angular/common';
import {
  asyncData,
  asyncError,
  defaultServerErrorMock,
  pokemonMock,
  specieMock,
  specieServiceMock,
  typeMock,
  typesDtoMock,
  typeServiceMock,
} from 'src/app/helpers/testHelpers';
import { BaseService } from 'src/app/services/base/base.service';

describe('AboutCardComponent', () => {
  let component: AboutCardComponent;
  let fixture: ComponentFixture<AboutCardComponent>;
  let typesService: TypesService;
  let baseService: BaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, CommonModule],
      declarations: [AboutCardComponent, FormatTextPipe],
      providers: [
        { provide: SpeciesService, useValue: specieServiceMock },
        { provide: TypesService, useValue: typeServiceMock },
        { provide: TypesDTO, useValue: typesDtoMock },
      ],
    }).compileComponents();

    baseService = TestBed.inject(BaseService);
    typesService = TestBed.inject(TypesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonMock;
    component.types = [typeMock];
    component.specie = specieMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('Testing getTypes()', fakeAsync(() => {
    spyOn(typesService, 'getType')
      .and.callThrough()
      .and.returnValue(asyncData(typeMock));
    component.getTypes();
  }));

  it('Testing getTypes() - (Empty pokemon)', fakeAsync(() => {
    component.pokemon = undefined;

    spyOn(typesService, 'getType')
      .and.callThrough()
      .and.returnValue(asyncData(typeMock));
    component.getTypes();
  }));

  it('Testing getTypes() - (Exception)', fakeAsync(() => {
    spyOn(typesService, 'getType')
      .and.callThrough()
      .and.returnValue(throwError(defaultServerErrorMock));
    component.getTypes();
  }));
});
