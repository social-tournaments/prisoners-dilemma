import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class ReverseTitForTat implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;
    if (n === 0) {
      return Move.Defect; // Defect on the first move
    }
    // Do the opposite of the opponent's last move
    return opponentMoves[n - 1] === Move.Cooperate
      ? Move.Defect
      : Move.Cooperate;
  }
}
