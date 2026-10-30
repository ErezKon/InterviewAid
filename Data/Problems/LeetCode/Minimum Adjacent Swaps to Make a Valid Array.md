# 2340. Minimum Adjacent Swaps to Make a Valid Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array](https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array)
**Companies:** Amazon

---

## Problem Description

You are given a **0-indexed** integer array `nums`.

**Swaps** of **adjacent** elements are able to be performed on `nums`.

A **valid** array meets the following conditions:
- The largest element (any of the largest elements if there are multiple) is at the rightmost position in the array.
- The smallest element (any of the smallest elements if there are multiple) is at the leftmost position in the array.

Return *the **minimum** swaps required to make* `nums` *a valid array*.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## Examples

```
Example 1:
  Input: nums = [3,4,5,5,3,1]
  Output: 6
  Explanation: Perform the following swaps:
  - Swap 1: Swap the 3rd and 4th elements, nums is then [3,4,5,3,5,1].
  - Swap 2: Swap the 4th and 5th elements, nums is then [3,4,5,3,1,5].
  - Swap 3: Swap the 3rd and 4th elements, nums is then [3,4,5,1,3,5].
  - Swap 4: Swap the 2nd and 3rd elements, nums is then [3,4,1,5,3,5].
  - Swap 5: Swap the 1st and 2nd elements, nums is then [3,1,4,5,3,5].
  - Swap 6: Swap the 0th and 1st elements, nums is then [1,3,4,5,3,5].
  It can be shown that 6 swaps is the minimum swaps required to make a valid array.
```

```
Example 2:
  Input: nums = [9]
  Output: 0
  Explanation: The array is already valid, so we return 0.
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
