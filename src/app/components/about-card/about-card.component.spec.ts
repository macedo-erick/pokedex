import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpeciesService } from 'src/app/services/species/species.service';
import { TypesService } from 'src/app/services/types/types.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AboutCardComponent } from './about-card.component';
import { of, throwError } from 'rxjs';
import { FormatTextPipe } from 'src/app/pipes/format-text/format-text.pipe';
import { CommonModule } from '@angular/common';
import {
  defaultServerErrorMock,
  pokemonMock,
  specieMock,
  specieServiceMock,
  typeMock,
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

  it('Testing getTypes()', () => {
    spyOn(typesService, 'getType')
      .and.callThrough()
      .and.returnValue(of({
        damage_relations: {
          double_damage_from: [{name: 'test'}],
          double_damage_to: [{name: 'test'}],
        }
      }));
    component.getTypes();
  });


  it('Testing getTypes() - Branch 2', () => {
    spyOn(typesService, 'getType')
      .and.callThrough()
      .and.returnValue(of({
        damage_relations: {
          double_damage_from: [{name: 'test'}],
          double_damage_to: [{name: 'test'}],
        }
      }));

    component.pokemon = {};

    component.getTypes();
  });

  it('Testing getTypes() - Branch 3', () => {
    spyOn(typesService, 'getType')
      .and.callThrough()
      .and.returnValue(of({
        damage_relations: {
          double_damage_from: [{name: 'test'}],
          double_damage_to: [{name: 'test'}],
        }
      }));

    component.pokemon = {types: [{}]};

    component.getTypes();
  });

});
