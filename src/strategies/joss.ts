import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class Joss implements Strategy {
  private sneakiness = 0.1; // 10% chance to defect when cooperating

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;
    if (n === 0) {
      return Move.Cooperate;
    }

    const opponentLastMove = opponentMoves[n - 1];

    // Standard Tit for Tat logic:
    if (opponentLastMove === Move.Cooperate) {
      // Intended move is Cooperate, but sometimes defect sneakily
      if (Math.random() < this.sneakiness) {
        return Move.Defect;
      } else {
        return Move.Cooperate;
      }
    } else {
      // Opponent defected, so defect (standard TFT retaliation)
      return Move.Defect;
    }
  }
}
