import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class SoftMajority implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;
    if (n === 0) {
      return Move.Cooperate; // Start by cooperating
    }

    const opponentCooperations = opponentMoves.filter(
      (m) => m === Move.Cooperate
    ).length;
    const opponentDefections = n - opponentCooperations;

    // Cooperate if opponent has cooperated at least as much as they defected
    if (opponentCooperations >= opponentDefections) {
      return Move.Cooperate;
    } else {
      return Move.Defect;
    }
  }
}
