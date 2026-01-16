import test from 'node:test';
import assert from 'node:assert/strict';
import twoSum from './index.mjs';

test('twoSum finds the first valid pair', () => {
  assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
});

test('twoSum handles duplicates', () => {
  assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
});

test('twoSum works with unsorted input', () => {
  assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
});

test('twoSum supports negatives', () => {
  assert.deepEqual(twoSum([-1, -2, -3, -4, -5], -8), [2, 4]);
});

test('twoSum returns null when no pair exists', () => {
  assert.equal(twoSum([1, 2, 3], 7), null);
});
