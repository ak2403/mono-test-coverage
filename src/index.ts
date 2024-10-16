import path from "path";
import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";

import { TestCoverage } from "./test-coverage";
import { calculatePercentage, roundTo } from "./utils/math";

const runCoverage = async () => {
  const rootDir = core.getInput("rootDir") || ".";
  const requiredWorkspaces = core.getInput("workspaces").split(/\r\n|\r|\n/);

  const directoryPath = path.join(process.env.GITHUB_WORKSPACE || ".", rootDir);

  const workspacesCoverage = requiredWorkspaces
    .map((workspace) => {
      const testCoverage = new TestCoverage(
        path.join(directoryPath, workspace)
      );

      return { ...testCoverage.execute(), name: workspace };
    })
    .filter(({ workspaces }) => workspaces.length !== 0);

  const totalCoveragePercentage = roundTo(
    workspacesCoverage.reduce((total, curr) => (total += curr.percentage), 0) /
      workspacesCoverage.length
  );

  const token = process.env.GITHUB_TOKEN || core.getInput("token") || "";

  const octokit = getOctokit(token);
  let issueNumber;

  if (context.issue.number) {
    issueNumber = context.issue.number;
  } else {
    const res = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
      commit_sha: context.sha,
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    issueNumber = res.data[0].number;
  }

  await octokit.rest.issues.createComment({
    issue_number: issueNumber,
    ...context.repo,
    body: `<div>
        <h2>🎯 Total Coverage: ${totalCoveragePercentage}%</h2>
        ${workspacesCoverage
          .map(({ name, workspaces }) => {
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
              ${tableRows.join("")}
              </table>
          </div>`;
          })
          .join("")}
    </div>`,
  });
};

runCoverage();
