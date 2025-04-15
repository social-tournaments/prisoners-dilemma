# Iterated Prisoner's Dilemma Tournament

## What is this project about?

This project simulates a round-robin tournament for the [Iterated Prisoner's Dilemma (IPD)](https://en.wikipedia.org/wiki/Prisoner%27s_dilemma#The_iterated_prisoner's_dilemma). In the IPD, two players repeatedly choose to either 'Cooperate' or 'Defect'. The payoff for each player depends on the combination of moves made in each round, according to a predefined payoff matrix (see `src/constants.ts`).

The goal of this project is to provide a simple framework where different strategies for playing the IPD can compete against each other to see which performs best over many rounds against a variety of opponents. The simulation runs each strategy against every other strategy for a fixed number of rounds (default is 200, defined in `src/game.ts`).

The results, including overall rankings and head-to-head scores, are saved in `results.json` and presented in a human-readable HTML report (`tournament_report.html`).

## How to Participate (Add Your Strategy)

Want to see how your own strategy fares? Follow these steps:

1.  **Understand the Basics:**
    *   Familiarize yourself with the `Strategy` interface defined in `src/interfaces.ts`. Your strategy must implement this interface, specifically the `nextMove` method.
    *   The `nextMove` method receives the history of your moves and your opponent's moves so far and must return either `Move.Cooperate` or `Move.Defect` (defined in `src/constants.ts`).
    *   Look at the existing strategies in the `src/strategies/` directory for examples (e.g., `titForTat.ts`, `alwaysCooperate.ts`).

2.  **Create Your Strategy File:**
    *   Create a new TypeScript file in the `src/strategies/` directory. Use camelCase for the filename (e.g., `myCleverStrategy.ts`).
    *   Inside the file, define and export a class that implements the `Strategy` interface. The class name should be the PascalCase version of the filename (e.g., `MyCleverStrategy`).

    ```typescript
    // src/strategies/myCleverStrategy.ts
    import { Strategy } from "../interfaces";
    import { Move } from "../constants";

    export class MyCleverStrategy implements Strategy {
      nextMove(myMoves: Move[], opponentMoves: Move[]): Move {
        // Your logic here!
        // Example: Cooperate for the first 10 moves, then defect.
        if (myMoves.length < 10) {
          return Move.Cooperate;
        } else {
          return Move.Defect;
        }
      }
    }
    ```

3.  **Run the Tournament:**
    *   Make sure you have Node.js and npm installed.
    *   Install dependencies: `npm install`
    *   Compile the TypeScript code: `npm run build` (or `npx tsc`)
    *   Run the tournament simulation: `npm start`
        *   This will automatically discover and load your new strategy from the `src/strategies/` directory.
        *   It runs all the games, calculates scores, and saves the results to `results.json`.

4.  **Generate and View the Report:**
    *   Generate the HTML report: `npm run report` (or `node dist/generateReport.js`)
    *   Open the generated `tournament_report.html` file in your web browser to see the rankings and how your strategy performed against others.

## How to Contribute

Contributions to improve the simulation framework itself are welcome! Here are some ideas:

*   **Add More Strategies:** Implement other well-known or novel IPD strategies.
*   **Improve Report:** Enhance the `tournament_report.html` with more visualizations or statistics.
*   **Add Tournament Variations:** Implement different tournament structures (e.g., with noise, different payoff matrices, evolutionary dynamics).
*   **Write Tests:** Add unit or integration tests to ensure correctness.
*   **Refactor Code:** Improve code quality, clarity, or performance.
*   **Fix Bugs:** Identify and fix any issues you find.

**Contribution Process:**

1.  **Fork the repository.**
2.  Create a new branch for your feature or bug fix (`git checkout -b my-new-feature`).
3.  Make your changes.
4.  Ensure your code compiles (`npm run build`) and the tournament runs (`npm start`).
5.  Commit your changes (`git commit -am 'Add some feature'`).
6.  Push to the branch (`git push origin my-new-feature`).
7.  Create a new Pull Request. 