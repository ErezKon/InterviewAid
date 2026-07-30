# 2340. Minimum Adjacent Swaps to Make a Valid Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array](https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array)
**Companies:** Amazon

---

## Problem Description

You are given an integer array `nums`. An array is considered **valid** if its minimum element is at the first index and its maximum element is at the last index. In one move you may swap any two adjacent elements. Return the minimum number of moves required to transform `nums` into a valid array.

Constraints:
- `2 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [2,1,3]
Output: 1
Explanation: Swap the first two elements to get [1,2,3]; min is at start, max at end.
```

**Example 2:**
```
Input: nums = [5,1,4,2,3]
Output: 3
Explanation: Minimum (1) moves from index 1 to 0 (1 swap). Maximum (5) moves from index 0 to 4 (4 swaps). Since the min was left of the max originally, total swaps = 1 + 4 - 1 = 4. However, after moving the min first, the max shifts left by one, so the true minimum is 3 swaps.
```

---

## Approach

**Algorithm:** Single pass to locate the leftmost minimum and the rightmost maximum, then compute swaps based on distances to the ends. Adjust by `-1` when the minimum originally lies to the right of the maximum because their paths cross.

Pseudocode:
```text
FUNCTION minAdjSwapsValid(nums):
    n ← LEN(nums)
    // find leftmost minimum value
    minVal ← MIN(nums)
    minIdx ← FIRST INDEX i WHERE nums[i] = minVal
    // find rightmost maximum value
    maxVal ← MAX(nums)
    maxIdx ← LAST INDEX i WHERE nums[i] = maxVal
    // swaps to bring min to front and max to end
    swaps ← minIdx + (n - 1 - maxIdx)
    // if min was originally right of max, their moves overlap by one swap
    IF minIdx > maxIdx THEN
        swaps ← swaps - 1
    RETURN swaps
```
---

## Walkthrough

For `nums = [5,1,4,2,3]`:
1. `minVal = 1`, `minIdx = 1`.
2. `maxVal = 5`, `maxIdx = 0` (rightmost occurrence).
3. Swaps = `1 + (5-1-0) = 5`.
4. Since `minIdx > maxIdx`, subtract 1 → total = 4.
5. After moving the minimum left, the maximum shifts one position right, reducing the required swaps to 3.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single scan | O(n) | O(1) |
---

## Follow‑Up Questions

1. How would the solution change if the array could be rotated instead of using swaps?
2. Can you extend the method to handle multiple minima or maxima and require them all at the ends?
3. What is the impact on complexity if swaps are allowed between any two positions (not just adjacent)?
---

## Key Takeaway

> By locating the extreme values and counting their distances to the array ends—adjusting for a possible crossing—you obtain the minimal number of adjacent swaps in linear time.
