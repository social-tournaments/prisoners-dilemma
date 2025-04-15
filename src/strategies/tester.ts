import { Strategy } from "../interfaces";
import { Move } from "../constants";

export class Tester implements Strategy {
  private tested = false;

  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = myMoves.length;

    if (n === 0) {
      return Move.Cooperate; // Cooperate initially
    }

    // If opponent defected after our test, switch to permanent defection (like Grim Trigger)
    if (
      this.tested &&
      opponentMoves[opponentMoves.length - 1] === Move.Defect
    ) {
      return Move.Defect; // Opponent failed the test, defect forever
    }

    // Execute the test on move 2 (index 1)
    if (n === 1) {
      this.tested = true;
      return Move.Defect; // Test by defecting
    }

    // After testing (or if opponent didn't defect after test), play Tit for Tat
    if (n > 0) {
      return opponentMoves[opponentMoves.length - 1];
    }

    return Move.Cooperate; // Should not be reached, but default to Cooperate
  }
}
