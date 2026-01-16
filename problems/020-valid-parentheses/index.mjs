export function isValid(s) {
  const stack = [];
  const openers = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);

  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
      continue;
    }

    const expected = openers.get(ch);
    if (!expected) {
      return false;
    }

    if (stack.pop() !== expected) {
      return false;
    }
  }

  return stack.length === 0;
}

export default isValid;
