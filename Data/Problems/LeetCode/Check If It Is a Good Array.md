# 1250. Check If It Is a Good Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-it-is-a-good-array](https://leetcode.com/problems/check-if-it-is-a-good-array)
**Companies:** Dropbox, Google, Microsoft, Nokia

---

## Problem Description
Given an array `nums` of positive integers. Your task is to select some subset of `nums`, multiply each element by an integer and add all these numbers. The array is said to be **good** if you can obtain a sum of `1` from the array by any possible subset and multiplicand.

Return `True` if the array is **good** otherwise return `False`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Examples
```
Example 1:
  Input: nums = [12,5,7,23]
  Output: true
  Explanation: Pick numbers 5 and 7.
  5*3 + 7*(-2) = 1
```

```
Example 2:
  Input: nums = [29,6,10]
  Output: true
  Explanation: Pick numbers 29, 6 and 10.
  29*1 + 6*(-3) + 10*(-1) = 1
```

```
Example 3:
  Input: nums = [3,6]
  Output: false
```

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