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
  dimension = 15;
  isRunning = false;
  speed = 5;
  interval: any;
  directions = [[-1, -1], [-1,  0], [-1, 1],
                [ 0, -1],           [ 0, 1],
                [ 1, -1], [ 1,  0], [1,  1]];

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
  toggleCell(i: number, j: number): void {
    this.board[i][j] = this.board[i][j] === State.Active ? State.Empty : State.Active;
  }

  // Updates board dimension
  updateDimension(dimension: number): void {
    this.dimension = dimension;

    // Reinit board
    this.board = this.constructBoard(this.dimension, State.Empty);
  }

  // Toggles board's running state
  toggleRunning(): void {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.interval);
    } else {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.board = this.next(this.board);
      }, this.speed);
    }
  }

  /**
   * Takes a board and returns board for next generation (Pure function)
   * Rules:
   * 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
   * 2. Any live cell with two or three live neighbors lives on to the next generation.
   * 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
   * 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
   * [Refer https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules]
   * 
   * @param board Input board
   */
  next(board: State[][]): State[][] {
    let newBoard = this.constructBoard(board.length, State.Empty);

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let neighbourCount = 0;
        this.directions.forEach(direction => {
          let curI = i + direction[0];
          let curJ = j + direction[1];

          if (curI < 0 ||  curI >= board.length || curJ < 0 || curJ >= board.length) {
            return;
          }

          board[curI][curJ] === State.Active && neighbourCount++;
        });

        if (board[i][j] === State.Active && (neighbourCount === 2 || neighbourCount === 3)) {
          newBoard[i][j] = State.Active;
        }

        if (board[i][j] === State.Empty && neighbourCount === 3) {
          newBoard[i][j] = State.Active;
        }
      }
    }

    return newBoard;
  }
}
