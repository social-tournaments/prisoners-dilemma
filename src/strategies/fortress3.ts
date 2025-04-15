import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class Fortress3 implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = myMoves.length;

    // Initial 3 defections
    if (n < 3) {
      return Move.Defect;
    }

    // After round 3, play Tit for Two Tats
    const oppN = opponentMoves.length;
    if (oppN < 2) {
      // Should not happen after n=3, but safety check
      return Move.Cooperate;
    }
    // Defect only if the opponent defected on the last two moves
    if (
      opponentMoves[oppN - 1] === Move.Defect &&
      opponentMoves[oppN - 2] === Move.Defect
    ) {
      return Move.Defect;
    }
    return Move.Cooperate;
  }
}
