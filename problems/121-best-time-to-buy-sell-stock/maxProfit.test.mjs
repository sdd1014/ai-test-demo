import test from "node:test";
import assert from "node:assert/strict";
import maxProfit from "./index.mjs";

test("maxProfit handles typical mixed prices", () => {
  assert.equal(maxProfit([7, 1, 5, 3, 6, 4]), 5);
});

test("maxProfit returns 0 when prices always fall", () => {
  assert.equal(maxProfit([7, 6, 4, 3, 1]), 0);
});

test("maxProfit returns last-first when prices rise", () => {
  assert.equal(maxProfit([1, 2, 3, 4, 5]), 4);
});

test("maxProfit handles a single price", () => {
  assert.equal(maxProfit([5]), 0);
});

test("maxProfit handles empty input", () => {
  assert.equal(maxProfit([]), 0);
});
