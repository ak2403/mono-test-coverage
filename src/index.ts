import path from "path";
import * as core from "@actions/core";

import { getTestSummaryPath } from "./services/summary-path";
import { getSummary } from "./services/summary";

const SOURCE_PATH = path.join(__dirname, "../examples/apps");

export const testCoverage = () => {
  const coverages = getTestSummaryPath(SOURCE_PATH);

  const summaries = getSummary(coverages);

  return summaries;
};

const runCoverage = () => {
  const result = testCoverage();

  core.setOutput("coverage", `<b>Coverage: ${result}`);
};

runCoverage();
