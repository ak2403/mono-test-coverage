type Coverage = {
  covered: number;
  pct: number;
  skipped: number;
  total: number;
};

export type CoverageBreakdown = {
  branches: Coverage;
  functions: Coverage;
  lines: Coverage;
  statements: Coverage;
};

export type CoverageSummaryData = {
  total: CoverageBreakdown;
  [key: string]: CoverageBreakdown;
};

export type AggregatedCoverage = {
  percentage: number;
  workspaces: {
    percentage: number;
    name: string;
  }[];
};
