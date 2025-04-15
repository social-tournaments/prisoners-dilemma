import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class Handshake implements Strategy {
  private cooperateForever = false;
  private defectForever = false;

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = myMoves.length;

    if (this.cooperateForever) {
      return Move.Cooperate;
    }
    if (this.defectForever) {
      return Move.Defect;
    }

    // Initial sequence: D, C
    if (n === 0) return Move.Defect;
    if (n === 1) return Move.Cooperate;

    // Check opponent's response to the handshake
    if (n === 2) {
      if (
        opponentMoves[0] === Move.Defect &&
        opponentMoves[1] === Move.Cooperate
      ) {
        // Opponent reciprocated the handshake
        this.cooperateForever = true;
        return Move.Cooperate;
      } else {
        // Opponent did not reciprocate
        this.defectForever = true;
        return Move.Defect;
      }
    }

    // Should not be reached after n=2 if logic is correct
    return Move.Defect; // Default to defect if state is somehow wrong
  }
}
