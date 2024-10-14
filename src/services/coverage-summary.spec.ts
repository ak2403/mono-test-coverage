import path from "path";
import { CoverageSummary } from "./coverage-summary";

describe("CoverageSummary", () => {
  it("fetch the coverage summary for specified path", () => {
    const sourcePath = path.join(__dirname, "../../examples/apps/web");

    const coverageSummary = CoverageSummary.fetch(sourcePath);

    expect(coverageSummary).toMatchSnapshot();
  });
});
