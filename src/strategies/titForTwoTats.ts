import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class TitForTwoTats implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;
    if (n < 2) {
      return Move.Cooperate;
    }
    // Defect only if the opponent defected on the last two moves
    if (
      opponentMoves[n - 1] === Move.Defect &&
      opponentMoves[n - 2] === Move.Defect
    ) {
      return Move.Defect;
    }
    return Move.Cooperate;
  }
}
