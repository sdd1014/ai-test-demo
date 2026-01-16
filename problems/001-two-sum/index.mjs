export function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const value = nums[i];
    const complement = target - value;
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(value, i);
  }
  return null;
}

export default twoSum;
