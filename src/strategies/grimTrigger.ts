import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class GrimTrigger implements Strategy {
  private opponentHasDefected = false;

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    if (opponentMoves.includes(Move.Defect)) {
      this.opponentHasDefected = true;
    }

    if (this.opponentHasDefected) {
      return Move.Defect;
    } else {
      return Move.Cooperate;
    }
  }
}
