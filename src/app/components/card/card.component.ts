import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() header: string = "header";
  @Input() fullWidth: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
