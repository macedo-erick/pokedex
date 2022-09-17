import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PokemonsService } from 'src/app/services/pokemons/pokemon.service';
import { DetailsComponent } from './details.component';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormatIdPipe } from 'src/app/pipes/format-id/format-id.pipe';
import { BaseService } from 'src/app/services/base/base.service';
import { specieMock, pokemonsServiceMock } from 'src/app/helpers/testHelpers';
import { ActivatedRoute } from '@angular/router';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let pokemonsService: PokemonsService;
  let httpController: HttpTestingController;
  let baseService: BaseService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        CommonModule,
      ],
      declarations: [DetailsComponent, FormatIdPipe],
      providers: [
        { provide: PokemonsService, useValue: pokemonsServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  switch (key) {
                    case 'id':
                      return '1';
                    case 'name':
                      return 'test';
                    default:
                      return '1';
                  }
                },
              },
            },
          },
        },
        BaseService,
      ],
    }).compileComponents();

    pokemonsService = TestBed.inject(PokemonsService);
    httpController = TestBed.inject(HttpTestingController);
    baseService = TestBed.inject(BaseService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing getPokemon() - (Using id param)', () => {
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.callFake((key) => {
      if (key == 'name') {
        return '';
      }

      return '1';
    });
    component.getPokemon();
  });

  it('Testing getPokemon() - Branch 2', () => {
    spyOn(component, 'getSpecie').and.callFake((key?: string) => undefined);

    spyOn(pokemonsService, 'getPokemon')
      .and.callThrough()
      .and.returnValue(of({}));

    component.getPokemon();
  });

  it('Testing getPokemon() - (Exception)', () => {
    spyOn(pokemonsService, 'getPokemon')
      .and.callThrough()
      .and.returnValue(throwError({ status: 500 }));

    component.getPokemon();
  });

  it('Testing getEpecie()', () => {
    const req = httpController.expectOne(
      'https://pokeapi.co/api/v2/pokemon-species/1'
    );
    req.flush(specieMock);

    component.getSpecie('https://pokeapi.co/api/v2/pokemon-species/1');
  });

  it('Testing get mobile()', () => {
    component.mobile;
  });
});
