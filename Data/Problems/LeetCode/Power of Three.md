# 326. Power of Three

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/power-of-three](https://leetcode.com/problems/power-of-three)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## Problem Description
Given an integer `n`, determine whether it is a power of three. Return `true` if there exists an integer `k` such that `3^k == n`; otherwise, return `false`. The solution must run in O(1) time.

## Examples
**Example 1:**
```
Input: n = 27
Output: true
Explanation: 27 = 3^3.
```
**Example 2:**
```
Input: n = 0
Output: false
Explanation: No power of three equals 0.
```
**Example 3:**
```
Input: n = 45
Output: false
Explanation: 45 is not a power of three.
```

## Approach
**Algorithm:** Constant‑time divisibility check using the maximum 32‑bit power of three.
**Key Insight:** The largest power of three that fits in a signed 32‑bit integer is `3^19 = 1162261467`. Any power of three `x` must divide this maximum value without remainder.

```text
FUNCTION isPowerOfThree(n):
    IF n <= 0:
        RETURN false
    RETURN 1162261467 MOD n == 0
```

## Walkthrough
For `n = 27`:
- `27 > 0` → proceed.
- `1162261467 MOD 27 = 0` because 27 divides the maximum power, so return `true`.
For `n = 45`:
- `45 > 0`.
- `1162261467 MOD 45 = 22 ≠ 0` → return `false`.

## Complexity Analysis
- **Time:** O(1) – a single modulus operation.
- **Space:** O(1) – no additional data structures.

## Follow‑Up Questions
1. How would you solve the problem without using the hard‑coded maximum power (e.g., using a loop or recursion)?
2. Can you extend the approach to check for powers of three in 64‑bit integers?
3. What changes are needed if the input range includes negative numbers and you must consider `3^k` for negative `k`?

## Key Takeaway
A single divisibility test against the largest 32‑bit power of three determines whether any integer is a power of three in constant time.
