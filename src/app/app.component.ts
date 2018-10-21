import { Component } from '@angular/core';
import { State } from './State';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  board: State[][];
  dimension = 5;

  constructor() {
    // Init board
    this.board = this.constructBoard(this.dimension, State.Empty);
  }

  // Creates a NxN array of given dimension filled with given State
  constructBoard(dimension: number, fill: State): State[][] {
    return new Array(dimension).fill(new Array(dimension).fill(fill));
  }


}
