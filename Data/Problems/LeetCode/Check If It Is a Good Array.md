# 1250. Check If It Is a Good Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-it-is-a-good-array](https://leetcode.com/problems/check-if-it-is-a-good-array)
**Companies:** Dropbox, Google, Microsoft, Nokia

---

## Problem Description
Given an integer array `nums`, determine whether there exists a non‑empty subset whose sum equals `1`. By Bézout's identity, this is equivalent to checking if the greatest common divisor (GCD) of all elements is `1`.

## Examples
- **Input:** `nums = [2,4,6]`  
  **Output:** `false`  
  *Explanation:* GCD is `2`, so no subset can sum to `1`.
- **Input:** `nums = [3,5,7]`  
  **Output:** `true`  
  *Explanation:* GCD is `1`; for example, `3 + 5 - 7 = 1` (using integer coefficients).

## Approach
Compute the GCD of the entire array iteratively. If the final GCD equals `1`, a subset with sum `1` exists; otherwise it does not.

```text
FUNCTION isGoodArray(nums):
    // Initialize GCD with first element
    SET g ← ABS(nums[0])
    FOR i ← 1 TO LENGTH(nums) - 1:
        SET g ← GCD(g, ABS(nums[i]))
    RETURN g = 1
```

## Walkthrough
| Step | Current number | GCD so far |
|------|----------------|-----------|
| 1    | 3              | 3 |
| 2    | 5              | GCD(3,5) = 1 |
| 3    | 7              | GCD(1,7) = 1 |
Final GCD = 1 → `true`.

## Complexity Analysis
- **Time:** O(n · log M) where `M` is the maximum element (Euclidean algorithm).
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would you adapt the solution to return an actual subset achieving sum 1?
2. What if the target sum is a value `t` other than `1`?
3. Can the problem be solved using linear algebra over the integers?

## Key Takeaway
The existence of a subset summing to 1 is determined solely by the GCD of all numbers; a GCD of 1 guarantees such a subset.