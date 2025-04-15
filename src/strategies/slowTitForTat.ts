import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class SlowTitForTat implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;

    // Cooperate on the first two moves
    if (n < 2) {
      return Move.Cooperate;
    }

    // Mimic opponent's move from two rounds ago
    return opponentMoves[n - 2];
  }
}
