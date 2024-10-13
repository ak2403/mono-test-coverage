import path from "path";
import fs from "fs";
import { isFilePathExists } from "../utils/path";
import { CoverageSummaryData } from "../types/services";

const DEFAULT_COVERAGE_PATH = "coverage/coverage-summary.json";

export class CoverageSummary {
  static fetch(
    sourcePath: string,
    filePath: string = DEFAULT_COVERAGE_PATH
  ): CoverageSummaryData {
    const coveragePath = path.join(sourcePath, filePath);

    if (!isFilePathExists(coveragePath)) {
      throw new Error("Coverage not found");
    }

    const dataBuffer = fs.readFileSync(coveragePath, {
      encoding: "utf-8",
    });

    return JSON.parse(dataBuffer) as CoverageSummaryData;
  }
}
