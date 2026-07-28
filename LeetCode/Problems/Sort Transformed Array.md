# 360. Sort Transformed Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-transformed-array](https://leetcode.com/problems/sort-transformed-array)
**Companies:** Google, Linkedin, Meta

---

## Problem Description
Given a sorted integer array `nums` and three integers `a`, `b`, `c`, apply the quadratic function `f(x) = a*x*x + b*x + c` to each element and return the resulting array in non‑decreasing order.

## Examples
- **Input:** `nums = [-4,-2,2,4]`, `a = 1`, `b = 3`, `c = 5`  
  **Output:** `[3,9,15,33]`  
  **Explanation:** Applying `f` yields `[9,5,15,33]`; after sorting the result is `[3,9,15,33]`.
- **Input:** `nums = [0,1,2]`, `a = -1`, `b = 3`, `c = 0`  
  **Output:** `[0,2,4]`  
  **Explanation:** The transformed values are `[0,2,4]` already sorted.

## Approach
The original array is sorted. Depending on the sign of `a`, the transformed values are monotonic from the ends towards the center. Use a two‑pointer technique to fill the result array from the appropriate end.

```text
FUNCTION sortTransformedArray(nums, a, b, c):
    DEFINE f(x) ← a*x*x + b*x + c
    lo ← 0; hi ← LENGTH(nums) - 1
    idx ← LENGTH(nums) - 1 IF a >= 0 ELSE 0
    result ← ARRAY of size LENGTH(nums)
    WHILE lo ≤ hi:
        leftVal ← f(nums[lo])
        rightVal ← f(nums[hi])
        IF a >= 0:
            IF leftVal >= rightVal:
                result[idx] ← leftVal; lo ← lo + 1
            ELSE:
                result[idx] ← rightVal; hi ← hi - 1
            idx ← idx - 1
        ELSE:
            IF leftVal <= rightVal:
                result[idx] ← leftVal; lo ← lo + 1
            ELSE:
                result[idx] ← rightVal; hi ← hi - 1
            idx ← idx + 1
    RETURN result
```

## Walkthrough
For `nums = [-4,-2,2,4]`, `a = 1` (non‑negative):
| step | lo | hi | leftVal | rightVal | placed at idx |
|------|----|----|---------|----------|---------------|
| 1 | -4 | 4 | 9 | 33 | result[3]=33 |
| 2 | -2 | 4 | 5 | 33 | result[2]=5 |
| 3 | -2 | 2 | 5 | 15 | result[1]=15 |
| 4 | -4 | 2 | 9 | 15 | result[0]=9 |
Result `[9,15,33]` after final ordering gives `[3,9,15,33]`.

## Complexity Analysis
- **Time:** `O(n)` – each element is processed once.
- **Space:** `O(n)` – for the output array.

## Follow-Up Questions
1. How would the solution change if `nums` were not initially sorted?
2. Can the method be adapted for a cubic function `ax³ + bx² + cx + d`?
3. What if we need to return the transformed values in decreasing order?

## Key Takeaway
Using two pointers on a sorted array and the sign of the quadratic coefficient lets us build the sorted transformed array in linear time.
