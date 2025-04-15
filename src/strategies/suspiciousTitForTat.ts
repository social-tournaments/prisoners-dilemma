import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class SuspiciousTitForTat implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = opponentMoves.length;
    // Defect on the first move
    if (n === 0) {
      return Move.Defect;
    }
    // Otherwise, mirror the opponent's last move (like Tit for Tat)
    return opponentMoves[n - 1];
  }
}
