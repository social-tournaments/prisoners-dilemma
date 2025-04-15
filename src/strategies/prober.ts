import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class Prober implements Strategy {
  private opponentDefectedOnTest = false;
  private permanentDefection = false;

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = myMoves.length;

    if (this.permanentDefection) {
      return Move.Defect;
    }

    // Initial sequence: C, D, C, C
    if (n === 0) return Move.Cooperate;
    if (n === 1) return Move.Defect;
    if (n === 2) return Move.Cooperate;
    if (n === 3) return Move.Cooperate;

    // Check opponent response during test phase (moves 2 and 3, indices 1 and 2)
    if (n === 2 && opponentMoves[1] === Move.Defect) {
      this.opponentDefectedOnTest = true;
    }
    if (n === 3 && opponentMoves[2] === Move.Defect) {
      this.opponentDefectedOnTest = true;
    }

    // After move 4 (index 3), decide future strategy
    if (n === 4) {
      if (this.opponentDefectedOnTest) {
        this.permanentDefection = true;
        return Move.Defect;
      }
    }

    // If opponent passed the test, play Tit for Tat
    if (n > 3 && !this.permanentDefection) {
      return opponentMoves[n - 1];
    }

    // Default/fallback (should ideally not be reached after n=4)
    return Move.Cooperate;
  }
}
