import * as fs from "fs";
import * as path from "path";
import { Strategy } from "./interfaces";
import { playGame } from "./game";

interface StrategyInfo {
  name: string;
  instance: Strategy;
  totalScore: number;
}

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

    // If not found by name, check if it's the default export (CommonJS interop)
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

// Run the tournament
console.log("\nRunning tournament...");
for (let i = 0; i < strategies.length; i++) {
  for (let j = i; j < strategies.length; j++) {
    if (i === j) {
      continue; // Skip self-play
    }

    const strat1 = strategies[i];
    const strat2 = strategies[j];

    console.log(`  Playing ${strat1.name} vs ${strat2.name}...`);
    const { score1, score2 } = playGame(strat1.instance, strat2.instance);

    strat1.totalScore += score1;
    strat2.totalScore += score2;
  }
}

// Sort strategies by score
strategies.sort((a, b) => b.totalScore - a.totalScore);

// Print results
console.log("\nTournament Results:");
strategies.forEach((strat, index) => {
  console.log(`${index + 1}. ${strat.name}: ${strat.totalScore} points`);
});
