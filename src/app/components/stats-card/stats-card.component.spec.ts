import { ComponentFixture, TestBed } from '@angular/core/testing';
import { pokemonMock } from 'src/app/helpers/testHelpers';

import { StatsCardComponent } from './stats-card.component';

describe('StatsCardComponent', () => {
  let component: StatsCardComponent;
  let fixture: ComponentFixture<StatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing get total - (Empty pokemon)', () => {
    component.pokemon = {};
    component.total;
  });
});
