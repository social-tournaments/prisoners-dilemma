import { Move } from "./constants";

export interface Strategy {
  /**
   * Determines the next move based on the opponent's past moves and my own past moves.
   * @param myMoves An array of my moves in previous rounds.
   * @param opponentMoves An array of the opponent's moves in previous rounds.
   * @returns The next move (Cooperate or Defect).
   */
  nextMove(myMoves: Move[], opponentMoves: Move[]): Move;
}
