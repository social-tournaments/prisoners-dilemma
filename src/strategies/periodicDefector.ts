import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class PeriodicDefector implements Strategy {
  private period = 10;

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = myMoves.length; // Use myMoves length for round number (0-indexed)

    // Defect on rounds 9, 19, 29, etc. (index-based)
    if ((n + 1) % this.period === 0) {
      return Move.Defect;
    }

    // Otherwise, cooperate
    return Move.Cooperate;
  }
}
