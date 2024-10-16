import path from "path";
import * as core from "@actions/core";

import { TestCoverage } from "./test-coverage";
import { makeAsBold } from "./utils/render-html";
import { calculatePercentage, roundTo } from "./utils/math";

const SOURCE_PATH = path.join(__dirname, "../examples");

const runCoverage = () => {
  const requiredWorkspaces = core.getInput("workspaces").split(/\r\n|\r|\n/);
  // const requiredWorkspaces = ["apps", "packages"];

  console.log(__dirname);
  console.log(process.env.GITHUB_WORKSPACE);

  const workspacesCoverage = requiredWorkspaces
    .map((workspace) => {
      const testCoverage = new TestCoverage(path.join(SOURCE_PATH, workspace));

      return { ...testCoverage.execute(), name: workspace };
    })
    .filter(({ workspaces }) => workspaces.length !== 0);

  const totalCoveragePercentage = roundTo(
    workspacesCoverage.reduce((total, curr) => (total += curr.percentage), 0) /
      workspacesCoverage.length
  );

  core.setOutput(
    "breakdown",
    `<div>
        <h2>🎯 Total Coverage: ${totalCoveragePercentage}%</h2>
        ${workspacesCoverage.map(({ name, workspaces }) => {
          const tableRows = workspaces.map((ws) => {
            return `<tr>
                <td>${ws.name}</td>
                <td>
                  ${calculatePercentage(
                    ws.breakdown.branches.covered,
                    ws.breakdown.branches.total
                  )}
                </td>
                <td>
                  ${calculatePercentage(
                    ws.breakdown.functions.covered,
                    ws.breakdown.functions.total
                  )}
                </td>
                <td>
                  ${calculatePercentage(
                    ws.breakdown.lines.covered,
                    ws.breakdown.lines.total
                  )}
                </td>
                <td>
                  ${calculatePercentage(
                    ws.breakdown.statements.covered,
                    ws.breakdown.statements.total
                  )}
                </td>
                <td>${roundTo(ws.percentage)}</td>
              </tr>`;
          });

          return `<div>
            <h4>🧩 Coverage breakdown percentage for ${name}:</h4>
            <table>
              <thead>
              <th></th>
              <th>Branches 🌿</th>
              <th>Functions 🔧</th>
              <th>Lines 📏</th>
              <th>Statements 📝</th>
              <th>Total Coverage 🎯</th>
              </thead>
              ${tableRows}
              </table>
          </div>`;
        })}
    </div>`
  );
};

runCoverage();
