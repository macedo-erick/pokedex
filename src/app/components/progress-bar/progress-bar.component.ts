import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'poke-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() label: string = 'Label';
  @Input() value: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
