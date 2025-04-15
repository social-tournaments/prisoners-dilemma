import * as fs from "fs";
import * as path from "path";

interface RankedStrategy {
  rank: number;
  name: string;
  totalScore: number;
}

type HeadToHeadScores = {
  [strategyName: string]: {
    [opponentName: string]: number;
  };
};

interface TournamentResults {
  ranking: RankedStrategy[];
  scores: HeadToHeadScores;
}

const resultsPath = path.join(__dirname, "..", "results.json");
const reportPath = path.join(__dirname, "..", "tournament_report.html");

try {
  // Read the results data
  const resultsData = fs.readFileSync(resultsPath, "utf-8");
  const results: TournamentResults = JSON.parse(resultsData);

  // Start HTML generation
  let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prisoner's Dilemma Tournament Results</title>
  <style>
    body { font-family: sans-serif; line-height: 1.4; padding: 20px; }
    h1, h2 { text-align: center; }
    table { border-collapse: collapse; margin: 20px auto; }
    th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: right; }
    th { background-color: #f2f2f2; text-align: center; font-weight: bold; }
    .rank-list { max-width: 400px; margin: 20px auto; padding-left: 20px; }
    .rank-list li { margin-bottom: 5px; }
    .diagonal { background-color: #eee; font-style: italic; color: #999; }
    .header-cell { background-color: #f2f2f2; font-weight: bold; text-align: left; }
  </style>
</head>
<body>
  <h1>Prisoner's Dilemma Tournament Results</h1>

  <h2>Rankings</h2>
  <ol class="rank-list">
`;

  // Add rankings
  results.ranking.forEach((strat) => {
    htmlContent += `    <li>${strat.name}: ${strat.totalScore} points</li>\n`;
  });

  htmlContent += `  </ol>

  <h2>Head-to-Head Scores (Row Player Score vs Column Player)</h2>
  <table>
    <thead>
      <tr>
        <th>&nbsp;</th> <!-- Top-left empty cell -->
`;

  // Table Header Row (Strategy Names)
  const strategyNames = results.ranking.map((s) => s.name); // Use ranked order for consistency
  strategyNames.forEach((name) => {
    htmlContent += `        <th>${name}</th>\n`;
  });

  htmlContent += `      </tr>
    </thead>
    <tbody>
`;

  // Table Body Rows
  strategyNames.forEach((rowPlayer) => {
    htmlContent += `      <tr>\n`;
    htmlContent += `        <td class="header-cell">${rowPlayer}</td>\n`; // Row header
    strategyNames.forEach((colPlayer) => {
      const score = results.scores[rowPlayer]?.[colPlayer];
      const displayScore = score === undefined || isNaN(score) ? "N/A" : score;
      const cellClass = rowPlayer === colPlayer ? "diagonal" : "";
      htmlContent += `        <td class="${cellClass}">${displayScore}</td>\n`;
    });
    htmlContent += `      </tr>\n`;
  });

  htmlContent += `    </tbody>
  </table>

</body>
</html>
`;

  // Write the HTML file
  fs.writeFileSync(reportPath, htmlContent);
  console.log(`HTML report generated successfully: ${reportPath}`);
} catch (error) {
  console.error("Error generating HTML report:", error);
  process.exit(1); // Exit with error code
}
