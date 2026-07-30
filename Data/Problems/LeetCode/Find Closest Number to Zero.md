# 2239. Find Closest Number to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-closest-number-to-zero](https://leetcode.com/problems/find-closest-number-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiger Analytics

---

## Problem Description

Return the number closest to 0. If two numbers are equidistant, return the positive one.

---

## Examples

**Example 1:**
```
nums = [-4, -2, 1, 4, 8]
Output: 1
Explanation: 1 is the closest to zero.
```

**Example 2:**
```
nums = [7, -10, 13, 8, 4]
Output: 4
Explanation: 4 is the closest to zero.
```

**Example 3 (tie):**
```
nums = [2, -2]
Output: 2
Explanation: Both 2 and -2 are equally close, return the positive one.
```

---

## Approach: Linear Scan — O(n) ✅

```text
FUNCTION findClosestNumber(nums):
    SET closest ← nums[0]
    FOR each num IN nums:
        IF ABS(num) < ABS(closest) OR (ABS(num) == ABS(closest) AND num > closest):
            SET closest ← num
    RETURN closest
```

---

## Walkthrough

| Index | num | ABS(num) | Current `closest` | Decision |
|-------|-----|----------|-------------------|----------|
| 0 | -4 | 4 | -4 | initialize |
| 1 | -2 | 2 | -4 | 2 < 4 → update to -2 |
| 2 | 1 | 1 | -2 | 1 < 2 → update to 1 |
| 3 | 4 | 4 | 1 | 4 > 1 → keep 1 |
| 4 | 8 | 8 | 1 | keep 1 |

Result is 1.

---

## Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few scalar variables.

---

## Follow-Up Questions

1. How would you modify the algorithm to return the index of the closest number?
2. What if the array is sorted? Could you achieve O(log n) time?
3. How would you handle very large integers where absolute value might overflow?

---

## Key Takeaway

> **Track the closest by absolute value, preferring the positive number on a tie.**