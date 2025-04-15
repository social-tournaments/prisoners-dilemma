import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class Adaptive implements Strategy {
  private permanentDefection = false;
  private lookbackRounds = 20;
  private defectionThreshold = 0.6; // 60%

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;

    if (this.permanentDefection) {
      return Move.Defect;
    }

    // Check for switch after lookbackRounds
    if (n >= this.lookbackRounds && n % this.lookbackRounds === 0) {
      const recentOpponentMoves = opponentMoves.slice(-this.lookbackRounds);
      const defections = recentOpponentMoves.filter(
        (m) => m === Move.Defect
      ).length;
      if (defections / this.lookbackRounds > this.defectionThreshold) {
        this.permanentDefection = true;
        return Move.Defect;
      }
    }

    // Default to Tit for Tat logic
    if (n === 0) {
      return Move.Cooperate;
    }
    return opponentMoves[n - 1];
  }
}
