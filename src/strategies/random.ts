import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class Random implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    return Math.random() < 0.5 ? Move.Cooperate : Move.Defect;
  }
}
