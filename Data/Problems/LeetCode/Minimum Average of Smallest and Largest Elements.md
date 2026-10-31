# 3194. Minimum Average of Smallest and Largest Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements](https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements)
**Companies:** Amazon, Google

---

## Problem Description

You have an array of floating point numbers `averages` which is initially empty. You are given an array `nums` of `n` integers where `n` is even.

You repeat the following procedure `n / 2` times:
- Remove the **smallest** element, `minElement`, and the **largest** element `maxElement`, from `nums`.
- Add `(minElement + maxElement) / 2` to `averages`.

Return the **minimum** element in `averages`.

**Constraints:**
- `2 <= n == nums.length <= 50`
- `n` is even.
- `1 <= nums[i] <= 50`

---

## Examples

```
Example 1:
  Input: nums = [7,8,3,4,15,13,4,1]
  Output: 5.5
  Explanation:
  step | nums                | averages
  0    | [7,8,3,4,15,13,4,1] | []
  1    | [7,8,3,4,13,4]      | [8]
  2    | [7,8,4,4]           | [8,8]
  3    | [7,4]               | [8,8,6]
  4    | []                  | [8,8,6,5.5]
  The smallest element of averages, 5.5, is returned.
```

```
Example 2:
  Input: nums = [1,9,8,3,10,5]
  Output: 5.5
  Explanation:
  step | nums           | averages
  0    | [1,9,8,3,10,5] | []
  1    | [9,8,3,5]      | [5.5]
  2    | [8,5]          | [5.5,6]
  3    | []             | [5.5,6,6.5]
```

```
Example 3:
  Input: nums = [1,2,3,7,8,9]
  Output: 5.0
  Explanation:
  step | nums          | averages
  0    | [1,2,3,7,8,9] | []
  1    | [2,3,7,8]     | [5]
  2    | [3,7]         | [5,5]
  3    | []            | [5,5,5]
```

---

## Approach

**Algorithm:** Sort the array and use two-pointer technique. While `lo < hi`, compute `(nums[lo] + nums[hi]) / 2` and keep the smallest value. Increment `lo` and decrement `hi` after each pair.

Pseudocode:
```text
FUNCTION minimumAverage(nums):
    SORT nums
    lo ← 0
    hi ← LEN(nums) - 1
    minAvg ← INFINITY
    WHILE lo <= hi DO
        avg ← (nums[lo] + nums[hi]) / 2.0
        minAvg ← MIN(minAvg, avg)
        lo ← lo + 1
        hi ← hi - 1
    RETURN minAvg
```
---

## Walkthrough

For `nums = [7,1,5,3]`:
1. Sorted → `[1,3,5,7]`.
2. First pair `(1,7)`: avg = 4 → minAvg = 4.
3. Second pair `(3,5)`: avg = 4 → minAvg remains 4.
4. Loop ends, return 4.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + two-pointers | O(n log n) | O(1) |
---

## Follow-Up Questions

1. How would you solve the problem if you could only use O(1) extra space and the array is read-only?
2. Can you extend the method to return the pair that yields the minimum average instead of just the value?
3. What changes are needed if the average should be rounded up to the nearest integer?
---

## Key Takeaway

> Sorting lets you pair extremes; the minimum average is simply the smallest average among those paired values.
