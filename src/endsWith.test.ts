import { endsWith } from "./endsWith";

test("examples", () => {
  expect(endsWith("test".split(""), 4, "test")).toEqual(true);
  expect(endsWith("test".split(""), 4, "st")).toEqual(true);
  expect(endsWith("test".split(""), 4, "est")).toEqual(true);

  expect(endsWith("test".split(""), 3, "s")).toEqual(true);
  expect(endsWith("test".split(""), 3, "es")).toEqual(true);

  expect(endsWith("test".split(""), 2, "te")).toEqual(true);
  expect(endsWith("test".split(""), 2, "e")).toEqual(true);
});
