import { stemItalianLight } from "./stemItalianLight";
import { readFileSync } from "fs";
import { join } from "path";

// https://gitbox.apache.org/repos/asf?p=lucene.git;a=blob;f=lucene/analysis/common/src/test/org/apache/lucene/analysis/it/TestItalianLightStemFilter.java

test("empty", () => {
  expect(stemItalianLight(null)).toEqual(null);
  expect(stemItalianLight(undefined)).toEqual(undefined);
  expect(stemItalianLight("")).toEqual("");
});

test("vocabulary", () => {
  readFileSync(join(__dirname, "..", "..", "data", "itlight.txt"), {
    encoding: "utf8",
  })
    .split(/\n/)
    .filter(Boolean)
    .forEach((line) => {
      const [actual, expected] = line.split("\t");
      expect(stemItalianLight(actual)).toEqual(expected);
    });
});
