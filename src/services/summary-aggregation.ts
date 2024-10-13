import {
  AggregatedCoverage,
  CoverageBreakdown,
  CoverageSummaryData,
} from "../types/services";

const aggregateBreakdownSummary = (
  breakdown: CoverageBreakdown
): { total: number; covered: number } => {
  return Object.values(breakdown).reduce(
    (aggregates, curr) => {
      aggregates.total += curr.total;
      aggregates.covered += curr.covered;

      return aggregates;
    },
    {
      total: 0,
      covered: 0,
    }
  );
};

const calculatePercentage = (
  coverage: { total: number; covered: number }[]
) => {
  const totalSum = coverage.reduce((total, curr) => (total += curr.total), 0);

  const coverageSum = coverage.reduce(
    (total, curr) => (total += curr.covered),
    0
  );

  return (coverageSum / totalSum) * 100;
};

export class SummaryAggregation {
  _summaries!: Record<string, CoverageSummaryData>;

  constructor(summaries: Record<string, CoverageSummaryData>) {
    this._summaries = summaries;
  }

  getTotalCoverages(): Record<string, { total: number; covered: number }> {
    const totalCoverages: Record<string, { total: number; covered: number }> =
      {};

    for (const [key, breakdown] of Object.entries(this._summaries)) {
      totalCoverages[key] = aggregateBreakdownSummary(breakdown.total);
    }

    return totalCoverages;
  }

  aggregateWorkspaces(): { percentage: number; name: string }[] {
    const totalCoverages = this.getTotalCoverages();

    return Object.keys(this._summaries).map((key) => {
      const percentage = totalCoverages[key];

      return {
        percentage: (percentage.covered / percentage.total) * 100,
        name: key,
        totalCoverage: this._summaries[key].total,
      };
    });
  }

  aggregate(): AggregatedCoverage {
    const totalCoverages = this.getTotalCoverages();

    return {
      percentage: calculatePercentage(Object.values(totalCoverages)),
      workspaces: this.aggregateWorkspaces(),
    };
  }
}
