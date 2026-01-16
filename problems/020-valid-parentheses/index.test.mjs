import test from 'node:test';
import assert from 'node:assert/strict';
import isValid from './index.mjs';

test('validates simple pairs', () => {
  assert.equal(isValid('()'), true);
  assert.equal(isValid('[]'), true);
  assert.equal(isValid('{}'), true);
});

test('validates nested and mixed pairs', () => {
  assert.equal(isValid('()[]{}'), true);
  assert.equal(isValid('{[()]}'), true);
});

test('rejects mismatched closing order', () => {
  assert.equal(isValid('(]'), false);
  assert.equal(isValid('([)]'), false);
});

test('rejects incomplete sequences', () => {
  assert.equal(isValid('(('), false);
  assert.equal(isValid('({['), false);
});

test('rejects unexpected closing brackets', () => {
  assert.equal(isValid(')'), false);
  assert.equal(isValid(']'), false);
});
