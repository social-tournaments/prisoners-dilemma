import * as fs from "fs";
import * as path from "path";
import { Strategy } from "./interfaces";
import { playGame } from "./game";

interface StrategyInfo {
  name: string;
  instance: Strategy;
  totalScore: number;
}

// Define a type for the head-to-head scores matrix
type HeadToHeadScores = {
  [strategyName: string]: {
    [opponentName: string]: number;
  };
};

const strategiesDir = path.join(__dirname, "strategies");
const strategyFiles = fs
  .readdirSync(strategiesDir)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js")); // Allow JS files after compilation

const strategies: StrategyInfo[] = [];

// Dynamically load strategies
for (const file of strategyFiles) {
  const filePath = path.join(strategiesDir, file);
  try {
    const module = require(filePath);
    const baseName = path.basename(file, path.extname(file));
    // Convert filename (e.g., alwaysCooperate) to expected class name (e.g., AlwaysCooperate)
    const expectedClassName =
      baseName.charAt(0).toUpperCase() + baseName.slice(1);

    // Try finding the class directly by expected name or as default export
    let StrategyClass = module[expectedClassName];

    // If not found by name, check if it\'s the default export (CommonJS interop)
    if (!StrategyClass && module.default) {
      // Check if default export itself is the class OR if the class is a property of default
      if (
        typeof module.default === "function" &&
        module.default.prototype?.nextMove
      ) {
        StrategyClass = module.default;
      } else if (
        module.default[expectedClassName] &&
        typeof module.default[expectedClassName] === "function" &&
        module.default[expectedClassName].prototype?.nextMove
      ) {
        StrategyClass = module.default[expectedClassName];
      }
    }

    // Validate and instantiate
    if (
      StrategyClass &&
      typeof StrategyClass === "function" &&
      StrategyClass.prototype?.nextMove
    ) {
      strategies.push({
        name: expectedClassName, // Use the derived class name
        instance: new StrategyClass(),
        totalScore: 0,
      });
      console.log(`Loaded strategy: ${expectedClassName}`);
    } else {
      console.warn(
        `Could not find a valid Strategy class named ${expectedClassName} in ${file}`
      );
    }
  } catch (error) {
    console.error(`Error loading strategy from ${file}:`, error);
  }
}

// Initialize head-to-head scores structure
const headToHeadScores: HeadToHeadScores = {};
strategies.forEach((strat) => {
  headToHeadScores[strat.name] = {};
});

// Run the tournament
console.log("\nRunning tournament...");
for (let i = 0; i < strategies.length; i++) {
  for (let j = i + 1; j < strategies.length; j++) {
    // Iterate j from i + 1 to avoid self-play and duplicate pairs
    const strat1 = strategies[i];
    const strat2 = strategies[j];

    console.log(`  Playing ${strat1.name} vs ${strat2.name}...`);
    const { score1, score2 } = playGame(strat1.instance, strat2.instance);

    console.log(`    ${strat1.name} score: ${score1}`);
    console.log(`    ${strat2.name} score: ${score2}`);

    strat1.totalScore += score1;
    strat2.totalScore += score2;

    // Store head-to-head results
    headToHeadScores[strat1.name][strat2.name] = score1;
    headToHeadScores[strat2.name][strat1.name] = score2;
  }
  // Add placeholder for self-play score (optional, could be NaN or null)
  headToHeadScores[strategies[i].name][strategies[i].name] = NaN;
}

// Sort strategies by score
strategies.sort((a, b) => b.totalScore - a.totalScore);

// Prepare results for JSON output
const rankedStrategies = strategies.map((strat, index) => ({
  rank: index + 1,
  name: strat.name,
  totalScore: strat.totalScore,
}));

const results = {
  ranking: rankedStrategies,
  scores: headToHeadScores,
};

// Write results to JSON file
const resultsPath = path.join(__dirname, "..", "results.json"); // Save in project root
try {
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\nTournament results saved to ${resultsPath}`);
} catch (error) {
  console.error(`Error writing results to ${resultsPath}:`, error);
}

// Print results to console (optional, kept for compatibility)
console.log("\nTournament Results (Console):");
rankedStrategies.forEach((strat) => {
  console.log(`${strat.rank}. ${strat.name}: ${strat.totalScore} points`);
});
