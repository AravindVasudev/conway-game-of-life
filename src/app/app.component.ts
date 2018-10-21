import { Component } from '@angular/core';
import { State } from './State';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  State: typeof State = State;
  board: State[][];
  dimension = 50;
  isRunning = false;
  speed = 0;
  interval: any;

  constructor() {
    // Init board
    this.board = this.constructBoard(this.dimension, State.Empty);
  }

  // Creates a NxN array of given dimension filled with given State
  constructBoard(dimension: number, fill: State): State[][] {
    let board = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
        board[i] = new Array(dimension).fill(fill);
    }

    return board;
  }

  // Sets the given position to State.Active
  setCell(i: number, j: number): void {
    this.board[i][j] = State.Active;
  }

  // Updates board dimension
  updateDimension(dimension: number): void {
    this.dimension = dimension;

    // Reinit board
    this.board = this.constructBoard(this.dimension, State.Empty);
  }

  toggleRunning(): void {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.interval);
    } else {
      this.isRunning = true;
      this.interval = setInterval(() => this.next(), this.speed);
    }
  }

  next(): void {
    console.log('NEXT');
  }
}
