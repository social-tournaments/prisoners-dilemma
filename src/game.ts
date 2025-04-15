import { Move, PAYOFFS } from "./constants";
import { Strategy } from "./interfaces";

/**
 * Calculates the scores for a single round based on the moves made.
 * @param move1 Player 1's move.
 * @param move2 Player 2's move.
 * @returns An object containing the scores for player 1 and player 2.
 */
export function playRound(
  move1: Move,
  move2: Move
): { score1: number; score2: number } {
  const score1 = PAYOFFS[move1][move2];
  const score2 = PAYOFFS[move2][move1];
  return { score1, score2 };
}

const DEFAULT_ROUNDS = 200;

/**
 * Simulates a single game between two strategies.
 * @param strategy1 Player 1's strategy.
 * @param strategy2 Player 2's strategy.
 * @param rounds The number of rounds to play.
 * @returns An object containing the total scores for player 1 and player 2.
 */
export function playGame(
  strategy1: Strategy,
  strategy2: Strategy,
  rounds: number = DEFAULT_ROUNDS
): { score1: number; score2: number } {
  let history1: Move[] = [];
  let history2: Move[] = [];
  let totalScore1 = 0;
  let totalScore2 = 0;

  for (let i = 0; i < rounds; i++) {
    const move1 = strategy1.nextMove(history1, history2);
    const move2 = strategy2.nextMove(history2, history1);

    const { score1, score2 } = playRound(move1, move2);

    history1.push(move1);
    history2.push(move2);
    totalScore1 += score1;
    totalScore2 += score2;
  }

  return { score1: totalScore1, score2: totalScore2 };
}
