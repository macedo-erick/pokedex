import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { pokemonMock } from 'src/app/helpers/testHelpers';
import { FormatIdPipe } from 'src/app/pipes/format-id/format-id.pipe';

import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [PokemonCardComponent, FormatIdPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing get type() - Branch 2', () => {
    component.pokemon = {}
  });


  it('Testing get type() - Branch 3', () => {
    component.pokemon = {types: [{weaknesses: ["test"]}]}
  });

});
