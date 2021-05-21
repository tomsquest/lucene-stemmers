import { stemFrenchMinimal } from "./stemFrenchMinimal";
import { readFileSync } from "fs";
import { join } from "path";

// https://gitbox.apache.org/repos/asf?p=lucene.git;a=blob;f=lucene/analysis/common/src/test/org/apache/lucene/analysis/fr/TestFrenchMinimalStemFilter.java

test("empty", () => {
  expect(stemFrenchMinimal(null)).toEqual(null);
  expect(stemFrenchMinimal(undefined)).toEqual(undefined);
  expect(stemFrenchMinimal("")).toEqual("");
});

test("examples", () => {
  expect(stemFrenchMinimal("chevaux")).toEqual("cheval");
  expect(stemFrenchMinimal("hiboux")).toEqual("hibou");

  expect(stemFrenchMinimal("chantés")).toEqual("chant");
  expect(stemFrenchMinimal("chanter")).toEqual("chant");
  expect(stemFrenchMinimal("chante")).toEqual("chant");

  expect(stemFrenchMinimal("baronnes")).toEqual("baron");
  expect(stemFrenchMinimal("barons")).toEqual("baron");
  expect(stemFrenchMinimal("baron")).toEqual("baron");
});

test("interge with last characters equal", () => {
  // Trailing repeated char elision :
  expect(stemFrenchMinimal("1234555")).toEqual("1234555");
  // Repeated char within numbers with more than 6 characters :
  expect(stemFrenchMinimal("12333345")).toEqual("12333345");
  // Short numbers weren't affected already:
  expect(stemFrenchMinimal("1234")).toEqual("1234");
  // Ensure behaviour is preserved for words!
  // Trailing repeated char elision :
  expect(stemFrenchMinimal("abcdeff")).toEqual("abcdef");
  // Repeated char within words with more than 6 characters :
  expect(stemFrenchMinimal("abcccddeef")).toEqual("abcccddeef");
  expect(stemFrenchMinimal("créées")).toEqual("cré");
  // Combined letter and digit repetition
  expect(stemFrenchMinimal("22hh00")).toEqual("22hh00"); // 10:00pm
});

test("vocabulary", () => {
  readFileSync(join(__dirname, "..", "..", "data", "frminimal.txt"), {
    encoding: "utf8",
  })
    .split(/\n/)
    .filter(Boolean)
    .forEach((line) => {
      const [actual, expected] = line.split("\t");
      expect(stemFrenchMinimal(actual)).toEqual(expected);
    });
});
