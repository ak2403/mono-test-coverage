import fs from "fs";

export const getDirectoriesForSource = (source: string): string[] => {
  const dirList = fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  return dirList;
};

export const isFilePathExists = (filePath: string): boolean =>
  fs.existsSync(filePath);
