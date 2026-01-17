import test from "node:test";
import assert from "node:assert/strict";
import maxSubArray from "./index.mjs";

test("finds the best sum across mixed values", () => {
  assert.equal(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
});

test("handles all-negative input by choosing the largest element", () => {
  assert.equal(maxSubArray([-8, -3, -6, -2, -5, -4]), -2);
});

test("returns the single value for a one-element array", () => {
  assert.equal(maxSubArray([7]), 7);
});

test("returns null for an empty array", () => {
  assert.equal(maxSubArray([]), null);
});
