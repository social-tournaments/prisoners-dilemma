import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class GenerousTitForTat implements Strategy {
  private forgivenessProbability = 0.1; // 10% chance to forgive

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;
    if (n === 0) {
      return Move.Cooperate;
    }

    // If opponent cooperated last, cooperate
    if (opponentMoves[n - 1] === Move.Cooperate) {
      return Move.Cooperate;
    }

    // If opponent defected last, usually defect, but sometimes forgive
    if (Math.random() < this.forgivenessProbability) {
      return Move.Cooperate; // Forgive
    } else {
      return Move.Defect; // Retaliate
    }
  }
}
