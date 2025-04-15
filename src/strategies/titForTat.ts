import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class TitForTat implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    // Cooperate on the first move
    if (opponentMoves.length === 0) {
      return Move.Cooperate;
    }
    // Otherwise, mirror the opponent's last move
    return opponentMoves[opponentMoves.length - 1];
  }
}
