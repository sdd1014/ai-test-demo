export function maxSubArray(nums) {
  if (nums.length === 0) {
    return null;
  }

  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    const value = nums[i];
    current = Math.max(value, current + value);
    if (current > best) {
      best = current;
    }
  }

  return best;
}

export default maxSubArray;
