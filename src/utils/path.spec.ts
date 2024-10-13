import path from "path";
import { getDirectoriesForSource } from "./path";

describe("getDirectoriesForSource()", () => {
  it("returns list of directories on source path", () => {
    const sourcePath = path.join(__dirname, "../../examples/apps");
    const result = getDirectoriesForSource(sourcePath);

    expect(result).toEqual(["docs", "web"]);
  });
});
