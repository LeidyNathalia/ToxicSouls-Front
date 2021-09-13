import { Component, OnInit } from '@angular/core';


// export interface Tile {
//   color: string;
//   cols: number;
//   rows: number;
//   text: string;
// }

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})


export class ViewEventsComponent implements OnInit {

  // tiles: Tile[] = [
  //   {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  //   {text: 'Evento tal ', cols: 3, rows: 1, color: 'lightblue'},
  //   {text: 'Fecha', cols: 1, rows: 1, color: 'lightpink'},
  //   {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  // ];

  constructor() { }

  ngOnInit(): void {
  }

}
