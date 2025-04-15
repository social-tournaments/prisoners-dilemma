import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class TwoTitsForTat implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;
    if (n === 0) {
      return Move.Cooperate;
    }

    // If opponent defected last round, defect this round and potentially next
    if (opponentMoves[n - 1] === Move.Defect) {
      return Move.Defect;
    }

    // If opponent defected second to last round (and cooperated last round), defect
    if (n > 1 && opponentMoves[n - 2] === Move.Defect) {
      return Move.Defect;
    }

    // Otherwise cooperate
    return Move.Cooperate;
  }
}
