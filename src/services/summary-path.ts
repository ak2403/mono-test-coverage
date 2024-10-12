import fs from "fs";
import { getDirectoriesForSource } from "../utils/path";

export const getTestSummaryPath = (source: string) => {
  const appDirectoriesList = getDirectoriesForSource(source);
  const output: Record<string, any> = {};

  appDirectoriesList.map((appPath) => {
    if (fs.existsSync(`${source}/${appPath}/coverage/coverage-summary.json`)) {
      const files = fs.readFileSync(
        `${source}/${appPath}/coverage/coverage-summary.json`,
        {
          encoding: "utf-8",
        }
      );

      output[appPath] = JSON.parse(files);
    }
  });

  return output;
};
