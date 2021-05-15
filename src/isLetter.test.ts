import { isLetter } from "./isLetter";

test.each`
  string | expected
  ${"a"} | ${true}
  ${"A"} | ${true}
  ${"z"} | ${true}
  ${"Z"} | ${true}
  ${"é"} | ${true}
  ${"É"} | ${true}
  ${"ბ"} | ${true}
  ${"0"} | ${false}
  ${"9"} | ${false}
  ${" "} | ${false}
  ${""}  | ${false}
`("'$string' should be '$expected'", ({ string, expected }) => {
  expect(isLetter(string)).toEqual(expected);
});
