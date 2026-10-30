# 2239. Find Closest Number to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-closest-number-to-zero](https://leetcode.com/problems/find-closest-number-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiger Analytics

---

## Problem Description

Given an integer array `nums` of size `n`, return *the number with the value **closest** to* `0` *in* `nums`. If there are multiple answers, return *the number with the **largest** value*.

**Constraints:**

- `1 <= n <= 1000`
- `-10^5 <= nums[i] <= 10^5`

---

## Examples

```
Example 1:
  Input: nums = [-4,-2,1,4,8]
  Output: 1
  Explanation:
  The distance from -4 to 0 is |-4| = 4.
  The distance from -2 to 0 is |-2| = 2.
  The distance from 1 to 0 is |1| = 1.
  The distance from 4 to 0 is |4| = 4.
  The distance from 8 to 0 is |8| = 8.
  Thus, the closest number to 0 in the array is 1.
```

```
Example 2:
  Input: nums = [2,-1,1]
  Output: 1
  Explanation: 1 and -1 are both the closest numbers to 0, so 1 being larger is returned.
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