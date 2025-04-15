import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class AlwaysCooperate implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    return Move.Cooperate;
  }
}
