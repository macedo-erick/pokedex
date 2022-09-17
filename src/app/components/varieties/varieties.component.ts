import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/models';

@Component({
  selector: 'varieties',
  templateUrl: './varieties.component.html',
  styleUrls: ['./varieties.component.scss'],
})
export class VarietiesComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() pokemon: Pokemon | undefined;

  selected: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selected = this.pokemon?.name as string;
  }

  viewVariety(variety: any) {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`details/${pokemonId}/${variety.value}`]);
  }
}
