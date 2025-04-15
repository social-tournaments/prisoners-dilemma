import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class LimitedRetaliator implements Strategy {
  private retaliationRounds = 3;
  private roundsLeftToDefect = 0;

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;

    if (n === 0) {
      return Move.Cooperate;
    }

    const opponentLastMove = opponentMoves[n - 1];

    // If opponent defected, start or restart retaliation
    if (opponentLastMove === Move.Defect) {
      this.roundsLeftToDefect = this.retaliationRounds;
    }

    // If we are in retaliation phase, defect
    if (this.roundsLeftToDefect > 0) {
      this.roundsLeftToDefect--;
      return Move.Defect;
    }

    // Otherwise, cooperate
    return Move.Cooperate;
  }
}
