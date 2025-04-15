import { Strategy } from "../interfaces";
import { Move, PAYOFFS } from "../constants";

export class Pavlov implements Strategy {
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
    const n = myMoves.length;
    if (n === 0) {
      return Move.Cooperate; // Start with cooperation
    }

    const lastMyMove = myMoves[n - 1];
    const lastOpponentMove = opponentMoves[n - 1];
    const lastPayoff = PAYOFFS[lastMyMove][lastOpponentMove];

    // Check if the last payoff was good (Reward or Temptation)
    const wasGoodPayoff = lastPayoff === 3 || lastPayoff === 5;

    if (wasGoodPayoff) {
      return lastMyMove; // Win-Stay: Repeat last move
    } else {
      // Lose-Shift: Switch move
      return lastMyMove === Move.Cooperate ? Move.Defect : Move.Cooperate;
    }
  }
}
