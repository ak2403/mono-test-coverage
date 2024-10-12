import path from "path";
import { getTestSummaryPath } from "./summary-path";

describe("getTestSummaryPath()", () => {
  it("renders", () => {
    const sourcePath = path.join(__dirname, "../../examples/apps");
    const result = getTestSummaryPath(sourcePath);
  });
});
