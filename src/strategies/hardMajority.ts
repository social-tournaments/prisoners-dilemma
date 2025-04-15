import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class HardMajority implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;
    if (n === 0) {
      return Move.Defect; // Start by defecting (harsher than SoftMajority)
    }

    const opponentCooperations = opponentMoves.filter(
      (m) => m === Move.Cooperate
    ).length;
    const opponentDefections = n - opponentCooperations;

    // Cooperate only if opponent has cooperated strictly more than they defected
    if (opponentCooperations > opponentDefections) {
      return Move.Cooperate;
    } else {
      return Move.Defect;
    }
  }
}
