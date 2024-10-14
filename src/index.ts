import path from "path";
import * as core from "@actions/core";

import { TestCoverage } from "./test-coverage";
import { makeAsBold } from "./utils/render-html";
import { calculatePercentage, roundTo } from "./utils/math";

const SOURCE_PATH = path.join(__dirname, "../examples/apps");

const runCoverage = () => {
  const testCoverage = new TestCoverage(SOURCE_PATH);

  console.log(core.getInput("rootDir"));
  console.log("==== Workspaces ====");
  console.log(core.getInput("workspaces").split(/\r\n|\r|\n/));
  console.log(__dirname);
  console.log(path.join(__dirname, core.getInput("rootDir")));

  const coverageSummary = testCoverage.execute();

  core.setOutput(
    "breakdown",
    `<div>
        <h2>🎯 Total Coverage: ${Number(coverageSummary.percentage).toFixed(
          2
        )}%</h2>
        <h4>🧩 Coverage breakdown percentage for apps:</h4>
        <table>
        <thead>
        <th></th>
        <th>Branches 🌿</th>
        <th>Functions 🔧</th>
        <th>Lines 📏</th>
        <th>Statements 📝</th>
        <th>Total Coverage 🎯</th>
        </thead>
        <tr>
        <td>${coverageSummary.workspaces[1].name}</td>
        <td>${calculatePercentage(
          coverageSummary.workspaces[1].breakdown.branches.covered,
          coverageSummary.workspaces[1].breakdown.branches.total
        )}</td>
        <td>${calculatePercentage(
          coverageSummary.workspaces[1].breakdown.functions.covered,
          coverageSummary.workspaces[1].breakdown.functions.total
        )}</td>
        <td>${calculatePercentage(
          coverageSummary.workspaces[1].breakdown.lines.covered,
          coverageSummary.workspaces[1].breakdown.lines.total
        )}</td>
        <td>${calculatePercentage(
          coverageSummary.workspaces[1].breakdown.statements.covered,
          coverageSummary.workspaces[1].breakdown.statements.total
        )}</td>
        <td>${roundTo(coverageSummary.workspaces[1].percentage)}</td>
        </tr>
        </table>
      </div>`
  );
};

runCoverage();
