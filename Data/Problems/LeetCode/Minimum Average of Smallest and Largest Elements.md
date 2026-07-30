# 3194. Minimum Average of Smallest and Largest Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements](https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements)
**Companies:** Amazon, Google

---

## Problem Description

Given an integer array `nums`, repeatedly pair the smallest and largest remaining elements, compute their average, and consider all such averages. Return the minimum average among all pairs.

Constraints:
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [1,3,5,2,4]
Output: 2.5
Explanation: Sorted array = [1,2,3,4,5]. Pairs: (1,5) avg=3, (2,4) avg=3, (3,3) avg=3. Minimum average = 3.
```

**Example 2:**
```
Input: nums = [7,1,5,3]
Output: 4.0
Explanation: Sorted = [1,3,5,7]. Pairs: (1,7) avg=4, (3,5) avg=4. Minimum average = 4.
```

---

## Approach

**Algorithm:** Sort the array and use two‑pointer technique. While `lo < hi`, compute `(nums[lo] + nums[hi]) / 2` and keep the smallest value. Increment `lo` and decrement `hi` after each pair.

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
| Sort + two‑pointers | O(n log n) | O(1) |
---

## Follow‑Up Questions

1. How would you solve the problem if you could only use O(1) extra space and the array is read‑only?
2. Can you extend the method to return the pair that yields the minimum average instead of just the value?
3. What changes are needed if the average should be rounded up to the nearest integer?
---

## Key Takeaway

> Sorting lets you pair extremes; the minimum average is simply the smallest average among those paired values.
