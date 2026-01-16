import test from "node:test";
import assert from "node:assert/strict";
import twoSum from "./index.mjs";

test("finds a valid pair in a basic case", () => {
  assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
});

test("handles duplicate values", () => {
  assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
});

test("works with negatives", () => {
  assert.deepEqual(twoSum([-1, -2, -3, -4, -5], -8), [2, 4]);
});

test("returns null when no pair exists", () => {
  assert.equal(twoSum([1, 2, 3], 7), null);
});
