# 747. Largest Number At Least Twice of Others

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-number-at-least-twice-of-others](https://leetcode.com/problems/largest-number-at-least-twice-of-others)
**Companies:** Bloomberg, Google, Microsoft, Zoho

---

## Problem Description

You are given an integer array `nums` where the largest integer is **unique**.

Determine whether the largest element in the array is **at least twice** as much as every other number in the array. If it is, return *the **index** of the largest element, or return* `-1` *otherwise*.

**Constraints:**
- `2 <= nums.length <= 50`
- `0 <= nums[i] <= 100`
- The largest element in `nums` is unique.

---

## Examples

```
Example 1:
  Input: nums = [3,6,1,0]
  Output: 1
  Explanation: 6 is the largest integer.
  For every other number in the array x, 6 is at least twice as big as x.
  The index of value 6 is 1, so we return 1.
```

```
Example 2:
  Input: nums = [1,2,3,4]
  Output: -1
  Explanation: 4 is less than twice the value of 3, so we return -1.
```

---

## Approach

**Single Pass — O(n)**

```text
FUNCTION dominantIndex(nums):
    // Find index of maximum element
    SET maxIdx ← 0
    FOR i ← 1 TO LENGTH(nums) - 1:
        IF nums[i] > nums[maxIdx]:
            SET maxIdx ← i
    // Verify max element is at least twice every other element
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF i != maxIdx AND nums[maxIdx] < 2 * nums[i]:
            RETURN -1
    RETURN maxIdx
```

---

## Walkthrough

Consider `nums = [3,6,1,0]`:
| i | nums[i] | maxIdx (so far) |
|---|---------|----------------|
|0|3|0|
|1|6|1 (new max) |
|2|1|1|
|3|0|1|
After the first loop, `maxIdx = 1` (value 6). The second loop checks:
- i=0: 6 >= 2*3 ✅
- i=2: 6 >= 2*1 ✅
- i=3: 6 >= 2*0 ✅
All checks pass, so return 1.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the value of the dominant element instead of its index?
2. Can this be solved without a second pass by tracking the second largest element during the first traversal?

---

## Key Takeaway

Find the maximum element, then verify it is at least twice every other element. A single pass to locate the max and a second pass for verification yields O(n) time and O(1) space.
