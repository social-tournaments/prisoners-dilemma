import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class Gradual implements Strategy {
  private retaliationLevel = 0; // Number of rounds to defect
  private roundsToDefect = 0; // Current count of defection rounds remaining

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;

    if (n === 0) {
      return Move.Cooperate;
    }

    const opponentLastMove = opponentMoves[n - 1];

    if (this.roundsToDefect > 0) {
      // Currently retaliating
      if (opponentLastMove === Move.Cooperate) {
        // Opponent cooperated, reset everything
        this.retaliationLevel = 0;
        this.roundsToDefect = 0;
        return Move.Cooperate;
      } else {
        // Opponent defected again during retaliation, increase level and defect
        this.retaliationLevel++;
        this.roundsToDefect = this.retaliationLevel; // Reset rounds for the new level
        this.roundsToDefect--; // Count this current defection
        return Move.Defect;
      }
    } else {
      // Not currently retaliating
      if (opponentLastMove === Move.Defect) {
        // Opponent defected, start retaliation
        this.retaliationLevel = 1;
        this.roundsToDefect = 1;
        this.roundsToDefect--; // Count this current defection
        return Move.Defect;
      } else {
        // Opponent cooperated, so cooperate
        return Move.Cooperate;
      }
    }
  }
}
