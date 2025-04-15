import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class AlwaysDefect implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    return Move.Defect;
  }
}
