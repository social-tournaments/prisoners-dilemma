export enum Move {
  Cooperate,
  Defect,
}

// Payoff matrix: scores[myMove][opponentMove]
export const PAYOFFS = {
  [Move.Cooperate]: {
    [Move.Cooperate]: 3, // Both cooperate (Reward)
    [Move.Defect]: 0, // I cooperate, opponent defects (Sucker)
  },
  [Move.Defect]: {
    [Move.Cooperate]: 5, // I defect, opponent cooperates (Temptation)
    [Move.Defect]: 1, // Both defect (Punishment)
  },
};
