import path from "path";
import fs from "fs";
import { isFilePathExists } from "../utils/path";
import { CoverageSummaryData } from "../types/services";

const DEFAULT_COVERAGE_PATH = "coverage/coverage-summary.json";

export class CoverageSummary {
  static fetch(
    sourcePath: string,
    filePath: string = DEFAULT_COVERAGE_PATH
  ): CoverageSummaryData | null {
    const coveragePath = path.join(sourcePath, filePath);

    if (!isFilePathExists(coveragePath)) {
      console.log(`No test coverage found for ${filePath}`);

      return null;
    }

    const dataBuffer = fs.readFileSync(coveragePath, {
      encoding: "utf-8",
    });

    return JSON.parse(dataBuffer) as CoverageSummaryData;
  }
}
