import path from "path";
import { CoverageSummary } from "./services/coverage-summary";
import { SummaryAggregation } from "./services/summary-aggregation";
import { getDirectoriesForSource } from "./utils/path";

export class TestCoverage {
  _sourcePath!: string;
  _coveragePath!: string | undefined;

  constructor(sourcePath: string, coveragePath?: string) {
    this._sourcePath = sourcePath;
    this._coveragePath = coveragePath;
  }

  execute() {
    const dirList = getDirectoriesForSource(this._sourcePath);

    const coverageSummaries = dirList.reduce((summaries, curr) => {
      const summary = CoverageSummary.fetch(path.join(this._sourcePath, curr));

      //@ts-ignore
      summaries[curr] = summary;

      return summaries;
    }, {});

    const summaryAggregation = new SummaryAggregation(coverageSummaries);
    const aggregate = summaryAggregation.aggregate();

    return aggregate;
  }
}
