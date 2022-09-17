import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { pokemonMock } from 'src/app/helpers/testHelpers';
import { DetailsComponent } from 'src/app/pages/details/details.component';

import { VarietiesComponent } from './varieties.component';

describe('VarietiesComponent', () => {
  let component: VarietiesComponent;
  let fixture: ComponentFixture<VarietiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'details/:pokemonId/:variety', component: DetailsComponent },
        ]),
      ],
      declarations: [VarietiesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietiesComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing changedValue()', () => {
    component.viewVariety({ value: 'teste' });
  });


  it('Testing ngOnInit() - Branch 2', () => {
    component.pokemon = undefined;
    component.ngOnInit();
  });

});
