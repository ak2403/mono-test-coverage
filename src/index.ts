import path from "path";
import * as core from "@actions/core";

import { TestCoverage } from "./test-coverage";
import { makeAsBold } from "./utils/render-html";

const SOURCE_PATH = path.join(__dirname, "../examples/apps");

const runCoverage = () => {
  const testCoverage = new TestCoverage(SOURCE_PATH);

  const coverageSummary = testCoverage.execute();

  core.setOutput(
    "coverage",
    `<html>
      <body>
        ${makeAsBold(
          `Total Coverage: ${Number(coverageSummary.percentage).toFixed(2)}%`
        )}
        <br />
        <br />
        <text>Coverage breakdown for ${
          coverageSummary.workspaces[0].name
        }</text>
        <br />
        ${makeAsBold(
          `Total Coverage: ${Number(
            coverageSummary.workspaces[0].percentage
          ).toFixed(2)}%`
        )}    
      </body>
    </html>`
  );
};

runCoverage();

// <table>
// <thead>
//   <th>Workspace</th>
//   <th>Coverage</th>
// </thead>
// <tbody>
//   ${coverageSummary.workspaces.map(
//     (workspace) =>
//       `<tr><td><b>${workspace.name}</b></td><td>${workspace.percentage}</td></tr>`
//   )}
// </tbody>
// </table>
